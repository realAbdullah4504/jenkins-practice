import React from "react";

export default function page7({setContactDetailsPage,contactDetailsPageError,contactDetailsPage}:ContactDetailsPropsTypePag) {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setContactDetailsPage((pre:ContactDetailsPageDataType) =>({
      ...pre,
      [name]:value
    }));
    
    if(contactDetailsPage.name && name=='name'){
      contactDetailsPageError.nameError = '';
    }
    if(contactDetailsPage.email && name == 'email'){
      contactDetailsPageError.emailError = '';
    }
    if(contactDetailsPage.phone && name == 'phone'){
      contactDetailsPageError.phoneError = '';
    }
  }
  return (
    <section className="m-2 mx-5 mb-6 mt-5  md:mx-10 lg:mx-20">
      <h2 className="mb-5 mt-1 font-semibold">
        Los datos de contacto solo son visibles para los artesanos que han contactado
tú.
      </h2>
        <div className="space-y-5">
        <div className="md:flex w-full gap-9 space-y-5 md:space-y-0">
          <div className="md:w-1/2 relative">
            <label htmlFor="page6PopUP_name__number" className="font-semibold">Name</label>
            <div className="bg-white py-3 px-3 rounded-lg  border-2 mt-2 w-full">
              <input type="text" className="w-full outline-none" id="page6PopUP_name__number" name="name" placeholder="Your name" onChange={handleChange} value={contactDetailsPage.name}/>
            </div>
              {contactDetailsPageError.nameError &&  <p className="absolute text-sm text-red-500">{contactDetailsPageError.nameError}</p>}
          </div>
          <div className="md:w-1/2 relative">
            <label htmlFor="page6PopUP_email__number" className="font-semibold">Email</label>
            <div className="bg-white py-3 px-3 rounded-lg  border-2 mt-2 w-full relative">
              <input type="email" className="w-full outline-none" id="page6PopUP_email__number" name="email" placeholder="Email address" onChange={handleChange} value={contactDetailsPage.email}/>
            </div>
              {contactDetailsPageError.emailError &&  <p className="absolute text-sm text-red-500">{contactDetailsPageError.emailError}</p>}
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <label htmlFor="page6PopUP_phone__number" className="font-semibold">Phone Number</label>
          <div className="bg-white py-3 px-3 rounded-lg  border-2 mt-2 relative md:mr-4">
            <input type="tel" className="w-full outline-none" id="page6PopUP_phone__number" name="phone" placeholder="Phone number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={handleChange} value={contactDetailsPage.phone}/>
          </div>
            {contactDetailsPageError.phoneError &&  <p className="absolute text-sm text-red-500">{contactDetailsPageError.phoneError}</p>}
        </div>
        </div>
    </section>
  );
}
