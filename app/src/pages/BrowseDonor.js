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
import axios  from "axios";

const BrowseDonor = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

  const [allUsers, setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  const [filters, setFilters] = useState({
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
  })

  const [regionData, setRegionData] = useState([]);
  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([])
  const [barangayData, setBarangayData] = useState([])

  useEffect(() => {
    if(!userId){
      navigate("/")
    } else {
      regions().then((region) => {
        // console.log(region);
        setRegionData(region);
        fetchAllUsers();
      });
    }
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

  const handleFilterResults = () => {
    console.table("Filters: ", filters);
  }

  const handleResetFilters = () => {
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
      <MainNavigationBar />
      <div className='flex flex-col min-h-[100vh] '>
        <div className="h-[10vh]"></div>
        <div className="flex min-h-[90vh]">
          {/* 1 */}
          <SideBar />
          {/* 2 */}
          <div className="flex flex-col-reverse items-start w-full gap-5 p-5 bg-gray-100 lg:justify-around lg:flex-row">
            {/* 1 */}
            <div className="bg-gray-50 w-[100%] lg:w-[60%] flex items-center flex-col p-5 rounded drop-shadow-lg">
              BROWSE DONORS
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
              <div className="flex items-center justify-center h-40">1</div>
            </div>
            {/* 2 */}
            <div className="bg-gray-50 w-[100%] lg:w-[35%] gap-5 flex flex-col p-5 rounded drop-shadow-lg">
              <div className="font-bold text-center">
                FILTERS
              </div>
              <div className="flex flex-col gap-5 p-2 text-sm">
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
                  <input type="number" value={filters.age} onChange={(e)=>{setFilters({...filters, age: e.target.value })}} max={150}  className="text-right outline-none "/>
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
                <button onClick={handleFilterResults} className="w-full p-2 font-bold text-white bg-blue-700 border-blue-600 rounded shadow hover:bg-blue-800">
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

export default BrowseDonor;