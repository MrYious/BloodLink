import { FaAngleLeft, FaAngleRight, FaRegStar, FaStar, FaTimes, } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  barangays,
  cities,
  provinces,
  regions,
} from "select-philippines-address";
import { useContext, useEffect, useState } from "react";

import { MainContext } from '../App.js'
import NavigationBar from '../components/NavigationBar';
import Rating from 'react-rating'
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import profilepic from '../assets/images/profilepic.jpg'

const SearchDonor = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

  const [allUsers, setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [pages, setPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  const [filters, setFilters] = useState(
    localStorage.getItem('filters')
    ?
      JSON.parse(localStorage.getItem('filters'))
    :
      {
        status: '',
        name: '',
        gender: '',
        age: 0,
        region: '',
        province: '',
        city: '',
        barangay: '',
        bloodGroup: '',
        healthStatus: '',
        rating: 0,
      }
  )

  const [regionData, setRegionData] = useState([]);
  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([])
  const [barangayData, setBarangayData] = useState([])

  useEffect(() => {
    regions().then((region) => {
      setRegionData(region);
      fetchAllUsers();

      const storedFilters = localStorage.getItem('filters');
      var obj = JSON.parse(storedFilters);
      if(storedFilters){
        regions().then((region) => {
          var regions = region;
          // setRegionData(region);

          // console.log(region);
          let selectedRegion = regions.find((data) => data.region_name === obj.region)
          // console.log('Selected Region Data: ', selectedRegion);

          if(selectedRegion){
            provinces(selectedRegion.region_code).then((province) => {
              var provinces = province;
              // setProvinceData(province);

              console.log(province);
              let selectedProvince = provinces.find((data) => data.province_name === obj.province)
              // console.log('Selected Province Data: ', selectedProvince);

              if(selectedProvince){
                cities(selectedProvince.province_code).then((city) => {
                  var cities = city;
                  // setCityData(city);

                  console.log(city);
                  let selectedCity = cities.find((data) => data.city_name === obj.city)
                  // console.log('Selected City Data: ', selectedCity);

                  if(selectedCity){
                    barangays(selectedCity.city_code).then((barangay) => {
                      var barangays = barangay;
                      // setBarangayData(barangay);

                      console.log(barangay);
                      let selectedBarangay = barangays.find((data) => data.brgy_name === obj.barangay)
                      // console.log('Selected Barangay Data: ', selectedBarangay);

                      setRegionData(regions);
                      setProvinceData(provinces);
                      setCityData(cities);
                      setBarangayData(barangays);
                    });
                  } else {
                    setRegionData(regions);
                    setProvinceData(provinces);
                    setCityData(cities);
                  }
                });
              } else {
                setRegionData(regions);
                setProvinceData(provinces);
              }
            });
          } else {
            setRegionData(regions);
          }
        });
      }
    });
  }, [])

  useEffect(() => {
    if(location.state){
      setAlert({
        show: true,
        header: location.state.message,
        isError: location.state.isError,
      });
    }
  }, [location])

  useEffect(() => {
    // setPages(Math.ceil(new Array(50).length / 15));
    setPages(Math.ceil(filteredUsers.length / 15) > 0 ? Math.ceil(filteredUsers.length / 15) : 1);
  }, [filteredUsers])

  const fetchAllUsers = () => {
    let endpoint = contextData.link + 'api/getAllUsers';
    axios.post(endpoint)
    .then(function (response) {
      console.log(response.data.userProfiles);
      var result = response.data.userProfiles;
      var allUsers = result.user.map((user)=>{
        return {
          user,
          address: result.address.find((address) => address.userID === user.id),
          donorInfo: result.donorInfo.find((donorInfo) => donorInfo.userID === user.id)
        }
      })
      console.log("All Users", allUsers);
      setAllUsers(allUsers);
      setFilteredUsers(allUsers);
      handleFilterResults(allUsers);
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

  const handleSelectRegion = (e) =>{
    console.log(e.target.value);
    const selectedData = regionData.find((data) => data.region_name === e.target.value)
    console.log('Selected Region Data: ', selectedData);
    setFilters({...filters, region: e.target.value, province: '', city: '', barangay: ''})
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
    setFilters({...filters, province: e.target.value, city: '', barangay: ''})
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
    setFilters({...filters, city: e.target.value, barangay: ''})

    barangays(selectedData.city_code).then((barangay) => {
      console.log(barangay);
      setBarangayData(barangay);
    });
  }

  const handleSelectBarangay = (e) =>{
    console.log(e.target.value);
    const selectedData = barangayData.find((data) => data.brgy_name === e.target.value)
    console.log('Selected Barangay Data: ', selectedData);
    setFilters({...filters, barangay: e.target.value})
  }

  const handleFilterResults = (allUsers) => {
    localStorage.setItem('filters', JSON.stringify(filters));
    var filtered = allUsers;
    console.log("ALL DONORS", filtered)

    console.log(filters.age, filters.age > 0? true: false)  ;

    if(filters.status && filters.status !== 'All'){
      filtered = filtered.filter(users =>
        users.user.status === filters.status
      );
    }
    if(filters.name){
      filtered = filtered.filter(users =>
        users.user.firstname.toLowerCase().includes(filters.name.toLowerCase()) ||
        users.user.lastname.toLowerCase().includes(filters.name.toLowerCase()) ||
        users.user.middlename.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if(filters.gender && filters.gender !== 'All'){
      filtered = filtered.filter(users =>
        users.user.gender === filters.gender
      );
    }
    if(filters.age > 0){
      filtered = filtered.filter(users =>
        users.user.age === parseInt(filters.age)
      );
    }
    if(filters.rating > 0){
      filtered = filtered.filter(users =>
        users.donorInfo.avgRating === parseInt(filters.rating)
      );
    }
    if(filters.region){
      console.log(filters.region);
      filtered = filtered.filter(users =>
        users.address.region === filters.region
      );
    }
    if(filters.province){
      filtered = filtered.filter(users =>
        users.address.province === filters.province
      );
    }
    if(filters.city){
      filtered = filtered.filter(users =>
        users.address.city === filters.city
      );
    }
    if(filters.barangay){
      filtered = filtered.filter(users =>
        users.address.barangay === filters.barangay
      );
    }
    if( filters.bloodGroup && filters.bloodGroup !== 'All'){
      filtered = filtered.filter(users =>
        users.user.bloodGroup === filters.bloodGroup
      );
    }
    if( filters.healthStatus && filters.healthStatus !== 'All'){
      filtered = filtered.filter(users =>
        users.donorInfo.healthStatus === filters.healthStatus
      );
    }

    setFilteredUsers(filtered);
    console.log("FILTERED", filtered);
  }

  const handleResetFilters = () => {
    localStorage.removeItem('filters');
    setFilteredUsers(allUsers);
    setFilters({
      status: '',
      name: '',
      gender: '',
      age: 0,
      region: '',
      province: '',
      city: '',
      barangay: '',
      bloodGroup: '',
      healthStatus: '',
      rating: 0,
    });
  }

  const handleNextPage = () => {
    if(pageNumber !== pages){
      setPageNumber(pageNumber+1);
    }
  }

  const handlePreviousPage = () => {
    if(pageNumber !== 1){
      setPageNumber(pageNumber-1);
    }
  }

  const handleClickDonor = (id) => {
    if(userId){
      navigate('/main/profile/'+ id)
    } else {
      setShowModal(true);
    }
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
                  View Donor Profile
                </h3>
                <FaTimes onClick={() => setShowModal(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col items-center justify-center gap-5 p-6 text-sm">
                <div>You have to login in order to view donor's profile</div>
                <Link to={'/login'} className="px-6 py-3 mb-1 mr-1 font-bold text-white uppercase transition-all duration-150 ease-linear bg-green-700 rounded shadow outline-none hover:bg-green-900 active:bg-green-800 hover:shadow-lg focus:outline-none">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      <NavigationBar />
      <div className='flex flex-col min-h-[100vh] '>
        <div className="h-[10vh]"></div>
        <div className="flex min-h-[90vh]">
          {/* 1 */}
          <div className="flex flex-col-reverse items-start w-full gap-5 p-5 bg-gray-100 lg:justify-around lg:flex-row">
            {/* 1 */}
            <div className="bg-gray-50 w-[100%] lg:w-[60%] flex flex-col p-5 rounded drop-shadow-lg gap-3">
              <div className="flex items-center justify-between">
                <div className="font-bold">BROWSE DONORS</div>
                <div className='flex items-center gap-1 text-sm select-none'>
                  <FaAngleLeft onClick={handlePreviousPage} className={` cursor-pointer hover:text-green-600`}/>
                  <div>Page {pageNumber} / {pages}</div>
                  <FaAngleRight onClick={handleNextPage} className={` cursor-pointer hover:text-green-600`} />
                </div>
              </div>
              {
                filteredUsers.length === 0
                ?
                  <div className="flex items-center justify-center h-40">No Records Found</div>
                :
                  <div className='flex flex-col gap-5 p-1 md:gap-2'>
                    {
                      filteredUsers
                      .slice(15 * (pageNumber - 1), 15 * pageNumber > filteredUsers.length ? filteredUsers.length : 15 * pageNumber)
                      .map((users, i) =>
                        <div key={i} onClick={() => {handleClickDonor(users.user.id)}} className="flex flex-col items-center overflow-hidden bg-gray-200 border border-gray-400 rounded-md cursor-pointer md:flex-row hover:border-gray-800 hover:shadow-sm hover:shadow-gray-400">
                          <div className='flex items-center justify-center w-full overflow-hidden bg-black select-none aspect-square md:w-28 md:h-28 shrink-0'>
                            <img src={users.user.profilePicture ? users.user.profilePicture : profilepic} className='w-full' alt="profilepicture" />
                          </div>
                          <div className='flex w-full h-full'>
                            <div className='flex flex-col justify-between w-1/2 gap-2 px-4 py-2 text-sm md:gap-0'>
                              <div className='text-lg font-bold'>
                                {users.user.firstname + ' ' + users.user.lastname}
                              </div>
                              <div className=''>
                                {users.user.gender}
                              </div>
                              <div className=''>
                                {users.user.age + ' years old'}
                              </div>
                              <div className='flex gap-1 text-lg'>
                                {
                                  [...Array(users.donorInfo.avgRating)].map((e, i) => <FaStar key={i} />)
                                }
                                {
                                  [...Array(5 - users.donorInfo.avgRating)].map((e, i) => <FaRegStar key={i} />)
                                }
                              </div>
                            </div>
                            <div className='flex flex-col justify-between w-1/2 gap-2 px-4 py-2 text-sm md:gap-0'>
                              <div className=''>
                                Status: <span className={`font-bold ${users.user.status === 'Active' ? 'text-green-700' :'text-red-700' }`}>
                                  {users.user.status}
                                  </span>
                              </div>
                              <div className=''>
                                Blood Group: {users.user.bloodGroup}
                              </div>
                              <div className=''>
                                Last Donation: {users.donorInfo.lastDonation ? users.donorInfo.lastDonation : 'N/A'}
                              </div>
                              <div className=''>
                                Total Donations: {users.donorInfo.totalDonations}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
              }
              {/* SHOW only if more than 1 page */}
              {
                pages > 1 &&
                <div className="flex items-center justify-center">
                  <div className='flex items-center gap-1 text-sm select-none'>
                    <FaAngleLeft onClick={handlePreviousPage} className={` cursor-pointer hover:text-green-600`}/>
                    <div>Page {pageNumber} / {pages}</div>
                    <FaAngleRight onClick={handleNextPage} className={` cursor-pointer hover:text-green-600`} />
                  </div>
                </div>
              }
            </div>
            {/* 2 */}
            <div className="bg-gray-50 w-[100%] lg:w-[35%] gap-3 flex flex-col p-5 rounded drop-shadow-lg">
              <div className="font-bold text-center">
                FILTERS
              </div>
              <div className="flex flex-col gap-4 p-2 text-sm">
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    Status
                  </div>
                  <select value={filters.status} onChange={(e)=>{setFilters({...filters, status: e.target.value })}} className="text-right outline-none cursor-pointer" >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    Name
                  </div>
                  <input type="text" value={filters.name} placeholder={'Empty'} onChange={(e)=>{setFilters({...filters, name: e.target.value })}} maxLength={30} className="text-right outline-none "/>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300 flex-wrap">
                  <div className="font-semibold ">
                    Gender
                  </div>
                  <select value={filters.gender} onChange={(e)=>{setFilters({...filters, gender: e.target.value })}} className="text-right outline-none cursor-pointer" >
                    <option value="All">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    Age
                  </div>
                  <input type="number" min={0} value={filters.age} onChange={(e)=>{setFilters({...filters, age: e.target.value })}} max={150}  className="text-right outline-none "/>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    Rating
                  </div>
                  <div className='text-lg'>
                    <Rating
                      emptySymbol={<FaRegStar />}
                      fullSymbol={<FaStar />}
                      initialRating={filters.rating}
                      value={filters.rating}
                      onChange={(value) => {setFilters({...filters, rating: value})}}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between item border-b-[1px] border-gray-300  flex-wrap">
                  <div className="font-semibold ">
                    Region
                  </div>
                  <select value={filters.region} onChange={handleSelectRegion} className="text-right outline-none cursor-pointer">
                    <option key={'0'} value='' disabled>Region</option>
                    {
                      regionData.map(
                        (region) => <option key={region.id} value={region.region_name}>{region.region_name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    Province
                  </div>
                  <select value={filters.province} onChange={handleSelectProvince} className="text-right outline-none cursor-pointer">
                    <option key={'0'} value='' disabled>Province</option>
                    {
                      provinceData.map(
                        (province) => <option key={province.province_code} value={province.province_name}>{province.province_name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    City
                  </div>
                  <select value={filters.city} onChange={handleSelectCity} className="text-right outline-none cursor-pointer">
                    <option key={'0'} value='' disabled>City</option>
                    {
                      cityData.map(
                        (city) => <option key={city.city_code} value={city.city_name}>{city.city_name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    Barangay
                  </div>
                  <select value={filters.barangay} onChange={handleSelectBarangay} className="text-right outline-none cursor-pointer">
                    <option key={'0'} value='' disabled>Barangay</option>
                    {
                      barangayData.map(
                        (barangay) => <option key={barangay.brgy_code} value={barangay.brgy_name}>{barangay.brgy_name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="flex justify-between border-b-[1px] border-gray-300 ">
                  <div className="font-semibold">
                    Blood Group
                  </div>
                  <select value={filters.bloodGroup} onChange={(e)=>{setFilters({...filters, bloodGroup: e.target.value })}} className="text-right outline-none cursor-pointer">
                    <option value="All">All</option>
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
                <div className="flex justify-between border-b-[1px] border-gray-300">
                  <div className="font-semibold ">
                    Health Status
                  </div>
                  <select value={filters.healthStatus} onChange={(e)=>{setFilters({...filters, healthStatus: e.target.value })}} className="text-right outline-none cursor-pointer">
                    <option value="All">All</option>
                    <option value="Great">Great</option>
                    <option value="Normal">Normal</option>
                    <option value="Bad">Bad</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleResetFilters} className="w-20 p-2 font-bold bg-gray-300 border border-gray-300 rounded shadow shadow-bg-gray-800 shrink-0 hover:bg-gray-400">
                  Reset
                </button>
                <button onClick={()=>{handleFilterResults(allUsers)}} className="w-full p-2 font-bold text-white bg-blue-700 border-blue-600 rounded shadow hover:bg-blue-800">
                  Filter Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchDonor;