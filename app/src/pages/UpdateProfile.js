import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  barangays,
  cities,
  provinces,
  regions,
} from "select-philippines-address";
import { useContext, useEffect, useState } from "react";

import { FaTimes } from 'react-icons/fa';
import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import { Widget } from "@uploadcare/react-widget";
import axios  from "axios";
import profilepic from '../assets/images/profilepic.jpg'

const UpdateProfile = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

  const [tab, setTab] = useState(1);

  const [newProfile, setnewProfile] = useState('')
  const [newName, setnewName] = useState('')

  const [tabAccount, setTabAccount] = useState({
    status: '',
    pic: '',
  })

  const [tabPersonal, setTabPersonal] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    age: 0,
    contact: '',
    email: '',
    bio: '',
  })

  const [tabAddress, setTabAddress] = useState({
    region: '',
    province: '',
    city: '',
    barangay: '',
    line1: '',
    line2: '',
  })

  const [tabSocial, setTabSocial] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
  })

  const [tabHealth, setTabHealth] = useState({
    bloodGroup: '',
    status: '',
    conditions: '',
  })

  const [regionData, setRegionData] = useState([]);
  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([])
  const [barangayData, setBarangayData] = useState([])

  const [modalContent, setModalContent] = useState({
  })

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  useEffect(() => {
    if(!userId){
      navigate("/");
    }else{
      fetchUserProfile();
    }
  }, [])

  useEffect(() => {
    fetchUserProfile();
  }, [tab])

  const fetchUserProfile = () => {
    const data = {
      id: userId,
    }
    let endpoint = contextData.link + 'api/getUserByID';
    axios.post(endpoint, {data})
    .then(function (response) {
      console.log("Load UserProfile Success", response.data.userProfile);
      var result = response.data.userProfile;
      // console.log(JSON.stringify(response.data.userProfile));

      setTabAccount({
        ...tabAccount,
        status: result.user.status,
        pic: result.user.profilePicture,
      })

      setTabPersonal({
        ...tabPersonal,
        firstName: result.user.firstname,
        middleName: result.user.middlename,
        lastName: result.user.lastname,
        gender: result.user.gender,
        age: result.user.age,
        contact: result.user.mobileNumber,
        email: result.user.email,
        bio: result.user.shortBio,
      })

      setTabSocial({
        ...tabSocial,
        facebook: result.user.linkFB ? result.user.linkFB : '',
        instagram: result.user.linkIG ? result.user.linkIG : '',
        twitter: result.user.linkTW ? result.user.linkTW : '',
      })

      setTabHealth({
        ...tabHealth,
        bloodGroup: result.user.bloodGroup,
        status: result.donorInfo.healthStatus,
        conditions: result.donorInfo.healthConditions ? result.donorInfo.healthConditions : '',
      })

      regions().then((region) => {
        var regions = region;
        // setRegionData(region);

        console.log(region);
        let selectedRegion = regions.find((data) => data.region_name === result.address.region)
        console.log('Selected Region Data: ', selectedRegion);
        console.log(selectedRegion,  result.address.region);

        provinces(selectedRegion.region_code).then((province) => {
          var provinces = province;
          // setProvinceData(province);

          console.log(province);
          let selectedProvince = provinces.find((data) => data.province_name === result.address.province)
          console.log('Selected Province Data: ', selectedProvince);

          cities(selectedProvince.province_code).then((city) => {
            var cities = city;
            // setCityData(city);

            console.log(city);
            let selectedCity = cities.find((data) => data.city_name === result.address.city)
            console.log('Selected City Data: ', selectedCity);

            barangays(selectedCity.city_code).then((barangay) => {
              var barangays = barangay;
              // setBarangayData(barangay);

              console.log(barangay);
              let selectedBarangay = barangays.find((data) => data.brgy_name === result.address.barangay)
              console.log('Selected Barangay Data: ', selectedBarangay);

              setRegionData(regions);
              setProvinceData(provinces);
              setCityData(cities);
              setBarangayData(barangays);

              setTabAddress({
                ...tabAddress,
                region: result.address.region,
                province: result.address.province,
                city: result.address.city,
                barangay: result.address.barangay,
                line1: result.address.addressLine1,
                line2: result.address.addressLine2,
              })
            });
          });
        });
      });
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      setAlert({
        show: true,
        header: error.response.data.message,
        isError: true,
      });
    });
  }

  useEffect(() => {
    // console.log('Data: ', data)
    setTabAddress({...tabAddress, line2: `${tabAddress.barangay && tabAddress.barangay + ', '}${tabAddress.city && tabAddress.city + ', '}${tabAddress.province && tabAddress.province + ', '}${tabAddress.region}` })
  }, [tabAddress.region, tabAddress.province, tabAddress.city, tabAddress.barangay])

  const handleSelectRegion = (e) =>{
    console.log(e.target.value);
    const selectedData = regionData.find((data) => data.region_name === e.target.value)
    console.log('Selected Region Data: ', selectedData);
    setTabAddress({...tabAddress, region: e.target.value, province: '', city: '', barangay: ''})
    setCityData([]);
    setBarangayData([]);

    provinces(selectedData.region_code).then((province) => {
      console.log(province);
      setProvinceData(province);
    });
  }

  const handleSelectProvince = (e) =>{
    console.log(e.target.value);
    const selectedData = provinceData.find((data) => data.province_name === e.target.value)
    console.log('Selected Province Data: ', selectedData);
    setTabAddress({...tabAddress, province: e.target.value, city: '', barangay: ''})
    setBarangayData([]);

    cities(selectedData.province_code).then((city) => {
      console.log(city);
      setCityData(city);
    });
  }

  const handleSelectCity = (e) =>{
    console.log(e.target.value);
    const selectedData = cityData.find((data) => data.city_name === e.target.value)
    console.log('Selected City Data: ', selectedData);
    setTabAddress({...tabAddress, city: e.target.value, barangay: ''})

    barangays(selectedData.city_code).then((barangay) => {
      console.log(barangay);
      setBarangayData(barangay);
    });
  }

  const handleSelectBarangay = (e) =>{
    console.log(e.target.value);
    const selectedData = barangayData.find((data) => data.brgy_name === e.target.value)
    console.log('Selected Barangay Data: ', selectedData);
    setTabAddress({...tabAddress, barangay: e.target.value})
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if(tab === 1){
      const data = {
        id: userId,
        tabAccount
      }
      let endpoint = contextData.link + 'api/updateAccountByID';
      axios.post(endpoint, {data})
      .then(function (response) {
        // console.log("Update Success", response.data);
        setAlert({
          show: true,
          header: response.data.message,
          isError: false,
        });
        localStorage.setItem('profile', tabAccount.pic);
        setnewProfile(tabAccount.pic);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: error.response.data.message,
          isError: true,
        });
      });
    } else if(tab === 2){
      const data = {
        id: userId,
        tabPersonal
      }
      let endpoint = contextData.link + 'api/updatePersonalByID';
      axios.post(endpoint, {data})
      .then(function (response) {
        // console.log("Update Success", response.data);
        setAlert({
          show: true,
          header: response.data.message,
          isError: false,
        });
        localStorage.setItem('fname', tabPersonal.firstName);
        localStorage.setItem('lname', tabPersonal.lastName);
        setnewName(tabPersonal.firstName +  tabPersonal.lastName);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: error.response.data.message,
          isError: true,
        });
      });
    } else if(tab === 3){
      const data = {
        id: userId,
        tabAddress
      }
      let endpoint = contextData.link + 'api/updateAddressByID';
      axios.post(endpoint, {data})
      .then(function (response) {
        // console.log("Update Success", response.data);
        setAlert({
          show: true,
          header: response.data.message,
          isError: false,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: error.response.data.message,
          isError: true,
        });
      });
    } else if(tab === 4){
      const data = {
        id: userId,
        tabSocial
      }
      let endpoint = contextData.link + 'api/updateSocialByID';
      axios.post(endpoint, {data})
      .then(function (response) {
        // console.log("Update Success", response.data);
        setAlert({
          show: true,
          header: response.data.message,
          isError: false,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: error.response.data.message,
          isError: true,
        });
      });
    } else if(tab === 5){
      const data = {
        id: userId,
        tabHealth
      }
      let endpoint = contextData.link + 'api/updateHealthByID';
      axios.post(endpoint, {data})
      .then(function (response) {
        // console.log("Update Success", response.data);
        setAlert({
          show: true,
          header: response.data.message,
          isError: false,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: error.response.data.message,
          isError: true,
        });
      });
    }

  }

  const handleResetFields = (e) => {
    e.preventDefault();
    fetchUserProfile();
  }

  return (
    <section className='flex flex-col w-full min-h-screen '>
      {/* ALERT */}
      {
        alert.show &&
        <div className={`flex items-start justify-between gap-5 w-[90%] md:w-[40%] lg:w-[30%]  border ${ alert.isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} p-4 rounded fixed z-[2] bottom-0 m-5`} role="alert">
          <div>
            <div className="py-1 font-bold">
              {alert.header}
            </div>
            {alert.message}
          </div>
          <FaTimes onClick={()=>{setAlert({...alert, show: false})}} className={`-mt-2 -mr-2 text-2xl  ${ alert.isError ? 'text-red-900' : 'text-green-900'}  cursor-pointer`}/>
        </div>
      }
      {/* MODAL */}
      {showModal && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Donor Review
                </h3>
                <FaTimes onClick={() => setShowModal(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col p-6 text-sm md:flex-row ">
                {/* HERE */}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      <MainNavigationBar newProfile newName/>
      <div className='flex flex-col min-h-[100vh] '>
        <div className="h-[10vh]"></div>
        <div className="flex min-h-[90vh]">
          {/* 1 */}
          <SideBar newProfile newName/>
          {/* 2 */}
          <div className="flex justify-center w-full bg-gray-100 ">
            <div className="flex flex-col md:flex-row justify-start items-start w-[100%] md:w-[85%] lg:w-[65%] gap-5">
              {/* Tabs */}
              <div className="flex flex-col gap-2 p-5 bg-gray-50 drop-shadow-xl w-72 shrink-0">
                <div className="py-2 font-bold">
                  Edit Profile Information
                </div>
                <div className="flex flex-col gap-2 text-sm font-semibold">
                  <div onClick={() => {setTab(1)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 1 && 'text-red-600 bg-gray-300' }`}>
                    Account
                  </div>
                  <div onClick={() => {setTab(2)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 2 && 'text-red-600 bg-gray-300' }`}>
                    Personal
                  </div>
                  <div onClick={() => {setTab(3)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 3 && 'text-red-600 bg-gray-300' }`}>
                    Address
                  </div>
                  <div onClick={() => {setTab(4)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 4 && 'text-red-600 bg-gray-300' }`}>
                    Social Media
                  </div>
                  <div onClick={() => {setTab(5)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 5 && 'text-red-600 bg-gray-300' }`}>
                    Health Status
                  </div>
                </div>
              </div>
              {/* Body */}
              <form onSubmit={handleUpdateProfile} className="flex flex-col w-full gap-2 p-5 bg-gray-50 drop-shadow-xl ">
                {
                  tab  === 1 ?
                  <>
                    <div className="py-2 font-bold">
                      Account
                    </div>
                    <div className="flex flex-col gap-5 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Status
                        </div>
                        <select value={tabAccount.status} onChange={(e)=>{setTabAccount({...tabAccount, status: e.target.value })}} className="outline-none cursor-pointer" required >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      {/* 2 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-10 pb-2">
                        <div className="font-semibold shrink-0">
                          Profile Picture
                        </div>
                        <label className="flex items-center justify-center overflow-hidden border border-black w-60 h-60 ">
                          <img src={tabAccount.pic ? tabAccount.pic : profilepic} alt="profile" width={"100%"} height={"100%"} className="cursor-pointer "/>
                          <div className="hidden">
                            <Widget
                              publicKey='41d925640f30fcc7b2c5'
                              id='file'
                              imagesOnly={true}
                              systemDialog={true}
                              onChange={ info => {
                                console.log('Upload completed:', info)
                                setTabAccount({...tabAccount, pic: info.cdnUrl })
                              }}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </> :
                  tab  === 2 ?
                  <>
                    <div className="py-2 font-bold">
                      Personal
                    </div>
                    <div className="flex flex-col gap-5 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          First Name
                        </div>
                        <input type="text" value={tabPersonal.firstName} onChange={(e)=>{setTabPersonal({...tabPersonal, firstName: e.target.value })}} maxLength={30} className="text-right outline-none " required/>
                      </div>
                      {/* 1.5 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Middle Name
                        </div>
                        <input type="text" value={tabPersonal.middleName} onChange={(e)=>{setTabPersonal({...tabPersonal, middleName: e.target.value })}} maxLength={15} className="text-right outline-none " required/>
                      </div>
                      {/* 2 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Last Name
                        </div>
                        <input type="text" value={tabPersonal.lastName} onChange={(e)=>{setTabPersonal({...tabPersonal, lastName: e.target.value })}} maxLength={15}  className="text-right outline-none " required/>
                      </div>
                      {/* 3 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Gender
                        </div>
                        <select value={tabPersonal.gender} onChange={(e)=>{setTabPersonal({...tabPersonal, gender: e.target.value })}} className="text-right outline-none cursor-pointer" required >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      {/* 4 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Age
                        </div>
                        <input type="number" value={tabPersonal.age} onChange={(e)=>{setTabPersonal({...tabPersonal, age: e.target.value })}} max={150}  className="text-right outline-none " required/>
                      </div>
                      {/* 5 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Contact Number
                        </div>
                        <input type="text" value={tabPersonal.contact} onChange={(e)=>{setTabPersonal({...tabPersonal, contact: e.target.value })}} minLength={11} maxLength={11} className="text-right outline-none " required/>
                      </div>
                      {/* 6 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-10 ">
                        <div className="font-semibold shrink-0">
                          Email Address
                        </div>
                        <input type="email" value={tabPersonal.email} onChange={(e)=>{setTabPersonal({...tabPersonal, email: e.target.value })}} maxLength={50} className="w-full text-right outline-none " required/>
                      </div>
                      {/* 7 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-5">
                        <div className="font-semibold shrink-0">
                          Short Bio
                        </div>
                        <textarea value={tabPersonal.bio} onChange={(e)=>{setTabPersonal({...tabPersonal, bio: e.target.value })}} maxLength={300} rows={3} className="w-full text-right outline-none resize-none " required/>
                      </div>
                    </div>
                  </> :
                  tab  === 3 ?
                  <>
                    <div className="py-2 font-bold">
                      Address
                    </div>
                    <div className="flex flex-col gap-5 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Region
                        </div>
                        <select value={tabAddress.region} onChange={handleSelectRegion} required className="text-right outline-none cursor-pointer">
                          <option key={'0'} value='' disabled>Region</option>
                          {
                            regionData.map(
                              (region) => <option key={region.id} value={region.region_name}>{region.region_name}</option>
                            )
                          }
                        </select>
                      </div>
                      {/* 2 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Province
                        </div>
                        <select value={tabAddress.province} onChange={handleSelectProvince} required className="text-right outline-none cursor-pointer">
                          <option key={'0'} value='' disabled>Province</option>
                          {
                            provinceData.map(
                              (province) => <option key={province.province_code} value={province.province_name}>{province.province_name}</option>
                            )
                          }
                        </select>
                      </div>
                      {/* 3 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          City
                        </div>
                        <select value={tabAddress.city} onChange={handleSelectCity} required className="text-right outline-none cursor-pointer">
                          <option key={'0'} value='' disabled>City</option>
                          {
                            cityData.map(
                              (city) => <option key={city.city_code} value={city.city_name}>{city.city_name}</option>
                            )
                          }
                        </select>
                      </div>
                      {/* 4 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Barangay
                        </div>
                        <select value={tabAddress.barangay} onChange={handleSelectBarangay} required className="text-right outline-none cursor-pointer">
                          <option key={'0'} value='' disabled>Barangay</option>
                          {
                            barangayData.map(
                              (barangay) => <option key={barangay.brgy_code} value={barangay.brgy_name}>{barangay.brgy_name}</option>
                            )
                          }
                        </select>
                      </div>
                      {/* 5 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-5">
                        <div className="font-semibold shrink-0">
                          Line 1
                        </div>
                        <input type="text" value={tabAddress.line1} onChange={(e)=>{setTabAddress({...tabAddress, line1: e.target.value })}}  className="w-full text-right outline-none" required maxLength={300}/>
                      </div>
                      {/* 6 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-5">
                        <div className="font-semibold shrink-0">
                          Line 2
                        </div>
                        <input type="text" value={tabAddress.line2} className="w-full text-right outline-none " required readOnly maxLength={300}/>
                      </div>
                    </div>
                  </> :
                  tab  === 4 ?
                  <>
                    <div className="py-2 font-bold">
                      Social Media
                    </div>
                    <div className="flex flex-col gap-5 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-5">
                        <div className="font-semibold shrink-0">
                          Facebook Link
                        </div>
                        <input type="text" value={tabSocial.facebook} placeholder={'Empty'} onChange={(e)=>{setTabSocial({...tabSocial, facebook: e.target.value })}}  className="w-full text-right outline-none" />
                      </div>
                      {/* 2 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-5">
                        <div className="font-semibold shrink-0 ">
                          Instagram Link
                        </div>
                        <input type="text" value={tabSocial.instagram} placeholder={'Empty'} onChange={(e)=>{setTabSocial({...tabSocial, instagram: e.target.value })}}  className="w-full text-right outline-none" />
                      </div>
                      {/* 3 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-5">
                        <div className="font-semibold shrink-0 ">
                          Twitter Link
                        </div>
                        <input type="text" value={tabSocial.twitter} placeholder={'Empty'} onChange={(e)=>{setTabSocial({...tabSocial, twitter: e.target.value })}}  className="w-full text-right outline-none " />
                      </div>
                    </div>
                  </> :
                  tab  === 5 &&
                  <>
                    <div className="py-2 font-bold">
                      Health Status
                    </div>
                    <div className="flex flex-col gap-5 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 ">
                        <div className="font-semibold">
                          Blood Group
                        </div>
                        <select value={tabHealth.bloodGroup} onChange={(e)=>{setTabHealth({...tabHealth, bloodGroup: e.target.value })}} className="text-right outline-none cursor-pointer" required >
                          <option value={'A+'} >A+</option>
                          <option value={'A-'} >A-</option>
                          <option value={'B+'} >B+</option>
                          <option value={'B-'} >B-</option>
                          <option value={'O+'} >O+</option>
                          <option value={'O-'} >O-</option>
                          <option value={'AB+'} >AB+</option>
                          <option value={'AB-'} >AB-</option>
                        </select>
                      </div>
                      {/* 2 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300">
                        <div className="font-semibold ">
                          Health Status
                        </div>
                        <select value={tabHealth.status} onChange={(e)=>{setTabHealth({...tabHealth, status: e.target.value })}} className="text-right outline-none cursor-pointer" required >
                          <option value="Great">Great</option>
                          <option value="Normal">Normal</option>
                          <option value="Bad">Bad</option>
                        </select>
                      </div>
                      {/* 3 */}
                      <div className="flex justify-between border-b-[1px] border-gray-300 gap-10">
                        <div className="font-semibold shrink-0">
                          Health Conditions
                        </div>
                        <textarea value={tabHealth.conditions} onChange={(e)=>{setTabHealth({...tabHealth, conditions: e.target.value })}} maxLength={500} rows={3} placeholder={'Empty'} className="w-full text-right outline-none resize-none" />
                      </div>
                    </div>
                  </>
                }
                {/* Actions */}
                <div className="flex justify-end gap-2 text-sm">
                  <button onClick={handleResetFields} className="px-3 py-2 text-white bg-gray-500 rounded-full hover:bg-gray-600">Reset</button>
                  <button type="submit" className="px-3 py-2 text-white bg-red-700 rounded-full hover:bg-red-900">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateProfile;