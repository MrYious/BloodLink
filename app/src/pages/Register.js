import { Link, useNavigate } from "react-router-dom";
import {
  barangays,
  cities,
  provinces,
  regions,
} from "select-philippines-address";
import { useContext, useEffect, useState } from "react";

import { FaTimes } from "react-icons/fa";
import { MainContext } from '../App.js'
import NavigationBar from '../components/NavigationBar';
import axios  from "axios";
import register from '../assets/images/register.jpg'

const Register = () => {
  const contextData = useContext(MainContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  const [stepTitle, setStepTitle] = useState('Personal Information');
  const [stepCount, setStepCount] = useState(1);

  const [data, setData] = useState({
    personal: {
      lastName: '',
      firstName: '',
      middleName: '',
      gender: '',
      age: '',
      mobileNo: '',
      email: '',
      bio: '',
    },
    address: {
      region: '',
      province: '',
      city: '',
      barangay: '',
      line1: '',
      line2: '',
    },
    security: {
      bloodGroup: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [regionData, setRegionData] = useState([]);
  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([])
  const [barangayData, setBarangayData] = useState([])

  useEffect(() => {
    regions().then((region) => {
      // console.log(region);
      setRegionData(region);
    });

  }, [])

  useEffect(() => {
    // console.log('Data: ', data)
    setData({...data, address: { ...data.address, line2: `${data.address.barangay && data.address.barangay + ', '}${data.address.city && data.address.city + ', '}${data.address.province && data.address.province + ', '}${data.address.region}` }})
  }, [data.address.region, data.address.province, data.address.city, data.address.barangay])

  const handleSelectRegion = (e) =>{
    console.log(e.target.value);
    const selectedData = regionData.find((data) => data.region_name === e.target.value)
    console.log('Selected Region Data: ', selectedData);
    setData({...data, address: { ...data.address, region: e.target.value, province: '', city: '', barangay: ''}})
    setCityData([]);
    setBarangayData([]);

    // Get Provinces
    provinces(selectedData.region_code).then((province) => {
      console.log(province);
      setProvinceData(province);
    });
  }

  const handleSelectProvince = (e) =>{
    console.log(e.target.value);
    const selectedData = provinceData.find((data) => data.province_name === e.target.value)
    console.log('Selected Province Data: ', selectedData);
    setData({...data, address: { ...data.address, province: e.target.value, city: '', barangay: ''}})
    setBarangayData([]);

    // Get Provinces
    cities(selectedData.province_code).then((city) => {
      console.log(city);
      setCityData(city);
    });
  }

  const handleSelectCity = (e) =>{
    console.log(e.target.value);
    const selectedData = cityData.find((data) => data.city_name === e.target.value)
    console.log('Selected City Data: ', selectedData);
    setData({...data, address: { ...data.address, city: e.target.value, barangay: ''}})

    // Get Provinces
    barangays(selectedData.city_code).then((barangay) => {
      console.log(barangay);
      setBarangayData(barangay);
    });
  }

  const handleSelectBarangay = (e) =>{
    console.log(e.target.value);
    const selectedData = barangayData.find((data) => data.brgy_name === e.target.value)
    console.log('Selected Barangay Data: ', selectedData);
    setData({...data, address: { ...data.address, barangay: e.target.value}})
  }

  const handlePreviousStep = (e) => {
    e.preventDefault();
    switch(stepCount){
      case 2:
        setStepTitle('Personal Information')
        break;
      case 3:
        setStepTitle('Address Information')
        break;
      case 4:
        setStepTitle('Short Bio')
        break;
    }
    setStepCount(stepCount - 1);
  }

  const handleNextStep = () => {
    switch(stepCount){
      case 1:
        setStepTitle('Address Information')
        break;
      case 2:
        setStepTitle('Short Bio')
        break;
      case 3:
        setStepTitle('Blood and Security Information')
        break;
    }
    setStepCount(stepCount + 1);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if(stepCount !== 4){
      handleNextStep();
    } else {
      console.log('DATA | ', data);
      let endpoint = contextData.link + 'api/register';
      console.log('ENDPOINT', endpoint);
      axios.post(endpoint, {data})
      .then(function (response) {
        console.log("Register Success", response.data)
        console.log(response.data);
        navigate("/login", {state: {message: response.data.message, isError: false}})
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
    // axios.post('http://localhost:5000/main/login', {
    //   email: email,
    //   password: password,
    // })
    // .then(function (response) {
    //   // SUCCESS
    //   console.log("Login Success", response.data)
    //   localStorage.clear();
    //   localStorage.setItem('loggedIn', "true");
    //   localStorage.setItem('userID', response.data.user.id);
    //   localStorage.setItem('addressID', response.data.user.addressID);
    //   localStorage.setItem('username', response.data.user.firstname);
    //   localStorage.setItem('type', response.data.user.accountType);

    //   localStorage.setItem('userData', JSON.stringify(response.data.user));
    //   localStorage.setItem('addressData', JSON.stringify(response.data.address));
    //   localStorage.setItem('requestsData', JSON.stringify(response.data.requests));
    //   if(response.data.user.accountType === "Donor"){
    //       localStorage.setItem('donorInfoData', JSON.stringify(response.data.donorInfo));
    //   }

    //   navigate("/dashboard")
    // })
    // .catch(function (error) {
    //     // FAIL
    //     console.log("Login Failed", error)
    //     setAlert({
    //         message: error.response.data.message,
    //         error: true
    //     });
    // });
  };

  return (
    <section className='flex flex-col w-full min-h-screen bg-white'>
      {/* ALERT */}
      {
        alert.show &&
        <div className={`flex items-start justify-between gap-5 w-[30%] border ${ alert.isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} p-4 rounded fixed z-[2] bottom-0 m-5`} role="alert">
          <div>
            <div className="py-1 font-bold">
              {alert.header}
            </div>
            {alert.message}
          </div>
          <FaTimes onClick={()=>{setAlert({...alert, show: false})}} className={`-mt-2 -mr-2 text-2xl  ${ alert.isError ? 'text-red-900' : 'text-green-900'}  cursor-pointer`}/>
        </div>
      }
      <NavigationBar />
      <div className="h-[10vh]"></div>
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full min-h-[90vh] py-10  lg:py-0">
        <div className="flex flex-col gap-4 w-[85%] lg:w-[45%] select-none">
          <img src={register} alt="w-full" />
        </div>
        <form onSubmit={handleRegister} className="flex flex-col w-[80%] lg:w-[40%] p-10 gap-10 ">
          {/* 1 */}
          <div className="flex flex-col gap-2 ">
            <div className="text-4xl font-bold tracking-wider">Join our Community!</div>
            <div className="text-gray-500">Register and be a member</div>
          </div>
          {/* 2 */}
          <div className='flex flex-col w-full gap-3 '>
            {/* Step */}
            <div className="flex flex-col gap-2 pb-2">
              <div className="flex justify-between gap-2">
                <div className={`border-4 ${stepCount >= 1 ? 'border-green-500' : 'border-gray-500'}  w-[25%]`}></div>
                <div className={`border-4 ${stepCount >= 2 ? 'border-green-500' : 'border-gray-500'}  w-[25%]`}></div>
                <div className={`border-4 ${stepCount >= 3 ? 'border-green-500' : 'border-gray-500'}  w-[25%]`}></div>
                <div className={`border-4 ${stepCount >= 4 ? 'border-green-500' : 'border-gray-500'}  w-[25%]`}></div>
              </div>
              <div>{stepTitle}</div>
            </div>
            {/* Step 1 */}
            {
              stepCount === 1 && <>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <input value={data.personal.firstName} onChange={(e)=> {setData({...data, personal: { ...data.personal, firstName: e.target.value}})}} maxLength={30} type={"text"} placeholder="First Name" autoComplete="First Name" required className="w-[100%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                  <input value={data.personal.middleName} onChange={(e)=> {setData({...data, personal: { ...data.personal, middleName: e.target.value}})}} maxLength={15} type={"text"} placeholder="Middle Name" autoComplete="Middle Name" required className="w-[100%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                  <input value={data.personal.lastName} onChange={(e)=> {setData({...data, personal: { ...data.personal, lastName: e.target.value}})}} maxLength={15} type={"text"} placeholder="Last Name" autoComplete="Last Name" required className="w-[100%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <input value={data.personal.email} onChange={(e)=> {setData({...data, personal: { ...data.personal, email: e.target.value}})}} maxLength={50} type={"email"} placeholder="Email (youremail@domain)" autoComplete="Email Address" required className="w-full md:w-[70%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                  <input value={data.personal.age} onChange={(e)=> {setData({...data, personal: { ...data.personal, age: e.target.value}})}} max={150} type={"number"} placeholder="Age" autoComplete="Age" required className="w-full md:w-[30%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <input value={data.personal.mobileNo} onChange={(e)=> {setData({...data, personal: { ...data.personal, mobileNo: e.target.value}})}} minLength={11} maxLength={11} type={"text"} placeholder="Mobile No (09XXXXXXXXX)" autoComplete="Mobile Number" required className="w-full md:w-[70%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                  <select value={data.personal.gender} onChange={(e)=> {setData({...data, personal: { ...data.personal, gender: e.target.value}})}} placeholder="Gender" autoComplete="Gender" required className="w-full md:w-[30%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded">
                    <option value='' disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </>
            }
            {/* Step 2 */}
            {
              stepCount === 2 && <>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <select value={data.address.region} onChange={handleSelectRegion} required className="w-full lg:w-[50%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded">
                    <option key={'0'} value='' disabled>Region</option>
                    {
                      regionData.map(
                        (region) => <option key={region.id} value={region.region_name}>{region.region_name}</option>
                      )
                    }
                  </select>
                  <select value={data.address.province} onChange={handleSelectProvince} required className="w-full lg:w-[50%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded">
                    <option key={'0'} value='' disabled>Province</option>
                    {
                      provinceData.map(
                        (province) => <option key={province.province_code} value={province.province_name}>{province.province_name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <select value={data.address.city} onChange={handleSelectCity} required className="w-full lg:w-[50%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded">
                    <option key={'0'} value='' disabled>City</option>
                    {
                      cityData.map(
                        (city) => <option key={city.city_code} value={city.city_name}>{city.city_name}</option>
                      )
                    }
                  </select>
                  <select value={data.address.barangay} onChange={handleSelectBarangay} required className="w-full lg:w-[50%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded">
                    <option key={'0'} value='' disabled>Barangay</option>
                    {
                      barangayData.map(
                        (barangay) => <option key={barangay.brgy_code} value={barangay.brgy_name}>{barangay.brgy_name}</option>
                      )
                    }
                  </select>
                </div>
                <input value={data.address.line1} onChange={(e)=> {setData({...data, address: { ...data.address, line1: e.target.value}})}} maxLength={300} type={"text"} placeholder="Address Line 1" autoComplete="Address Line 1" required className="w-[100%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                <input
                  value={`${data.address.barangay && data.address.barangay + ', '}${data.address.city && data.address.city + ', '}${data.address.province && data.address.province + ', '}${data.address.region}`}
                  maxLength={300} disabled type={"text"} placeholder="Address Line 2" autoComplete="Address Line 2" required className="w-[100%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
              </>
            }
            {/* Step 3 */}
            {
              stepCount === 3 && <>
                <div className="w-[100%] text-xs italic ">
                  This will show on your profile
                </div>
                <textarea value={data.personal.bio} onChange={(e)=> {setData({...data, personal: { ...data.personal, bio: e.target.value}})}} maxLength={500} required placeholder="Tell us something about yourself" className="w-full resize-none bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" rows="6"></textarea>
              </>
            }
            {/* Step 4 */}
            {
              stepCount === 4 && <>
                <input value={data.security.password} onChange={(e)=> {setData({...data, security: { ...data.security, password: e.target.value}})}} minLength={5} maxLength={15} type={"password"} placeholder="Password" autoComplete="Password" required className="w-full bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                <input value={data.security.confirmPassword} onChange={(e)=> {setData({...data, security: { ...data.security, confirmPassword: e.target.value}})}} minLength={5} maxLength={15} type={"password"} placeholder="Confirm Password" autoComplete="Confirm Password" required className="w-full bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                <select value={data.security.bloodGroup} onChange={(e)=> {setData({...data, security: { ...data.security, bloodGroup: e.target.value}})}} placeholder="Blood Group" autoComplete="Blood Group" required className="w-full bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded">
                  <option value={''} disabled>Blood Group</option>
                  <option value={'A+'} >A+</option>
                  <option value={'A-'} >A-</option>
                  <option value={'B+'} >B+</option>
                  <option value={'B-'} >B-</option>
                  <option value={'O+'} >O+</option>
                  <option value={'O-'} >O-</option>
                  <option value={'AB+'} >AB+</option>
                  <option value={'AB-'} >AB-</option>
                </select>
              </>
            }

            {/* Button */}
            {
              stepCount === 4
              ?
                <div className="flex items-center justify-between gap-2 mt-2">
                  <button onClick={handlePreviousStep} type='button' className="w-[25%] py-2 text-xl font-bold tracking-wide text-gray-200 bg-blue-800 rounded-sm shadow-md hover:bg-blue-900 shadow-black">
                    BACK
                  </button>
                  <button type="submit" className="w-[75%] py-2 text-xl font-bold tracking-wide text-gray-200 bg-green-700 rounded-sm shadow-md hover:bg-green-900 shadow-black">
                    REGISTER
                  </button>
                </div>
              :
                <div className="flex items-center justify-between gap-2 mt-2">
                  <button onClick={handlePreviousStep} disabled={stepCount === 1} type='button' className={`${stepCount === 1 ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-800 hover:bg-blue-900'} cursor-pointer w-[25%] py-2 text-xl font-bold tracking-wide text-gray-200 rounded-sm shadow-md shadow-black`}>
                    BACK
                  </button>
                  <button type='submit' className="w-[75%] py-2 text-xl font-bold tracking-wide text-gray-200 bg-green-700 rounded-sm shadow-md hover:bg-green-900 shadow-black">
                    NEXT
                  </button>
                </div>
            }
          </div>
          {/* 3 */}
          <div className="w-full tracking-normal">
            <span> Already Registered ? </span>
            <Link to='/login' className="text-red-600 ">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;