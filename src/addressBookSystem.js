class AddressBook {

    constructor(){
        this.contacts = [];
    }

    addContact(newContact){
        if(this.contacts.some(contact => contact.firstName === newContact.firstName)){
            throw new Error("Duplicate contact entry not allowed")
        }
        this.contacts.push(newContact);
    }

    viewContact(name){
        let contactIndex = this.contacts.findIndex(contact => contact.firstName === name);
        if(contactIndex === -1) throw new Error(`No contact with name '${name}' found`);
        else return this.contacts[contactIndex];
    }

    editContact(name, newContact){
        let contactIndex = this.contacts.findIndex(contact => contact.firstName === name);
        if(contactIndex === -1) throw new Error(`No contact with name '${name}' found`);
        else Object.assign(this.contacts[contactIndex], newContact);
    }

    deleteContact(name){
        let contactIndex = this.contacts.findIndex(contact => contact.firstName === name);
        if(contactIndex === -1) throw new Error(`No contact with name '${name}' found`);
        else this.contacts.splice(contactIndex, 1);
    }

    getContactsCount(){
        return this.contacts.reduce(contact => contact + 1, 0);
    }

    searchContactByCityOrState(location){
        if(!location){
            throw new Error("Provide a city or a state");
        }
        else{
            return this.contacts.filter(contact => contact.state === location || contact.city === location);
        }
    }

    viewContactByCityOrState(location){
        if(!location){
            throw new Error("Provide a city or a state");
        }
        else{
            return this.contacts.filter(contact => contact.state === location || contact.city === location);
        }
    }

    countContactsByCityOrState(location){
        if(!location){
            throw new Error("Provide a city or a state");
        }
        else{
            return this.contacts.filter(contact => contact.state === location || contact.city === location).reduce(count => count + 1, 0);
        }
    }

    sortByName() {
        return this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }

    sortByCityStateZip(key){
        return this.contacts.sort((a, b) => {
            if(typeof a[key] === "string"){
                return a[key].localeCompare(b[key]);
            } else {
                return a[key] - b[key];
            }
        })
    }
}

class AddressBookContact {
    
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email){
        this.firstName = this.validateName(firstName);
        this.lastName = this.validateName(lastName);
        this.address = this.validateAddress(address);
        this.city = this.validateCity(city);
        this.state = this.validateState(state);
        this.zip = this.validateZip(zip);
        this.phoneNumber = this.validatePhoneNumber(phoneNumber);
        this.email = this.validateEmail(email);
    }

    validateName(name){
        const nameRegex = /^[A-Z][a-zA-Z\s]{2,}$/;
        if(!nameRegex.test(name)){
            throw new Error("Invalid name: Name should start with Capital and Minimum 3 Characters");
        }
        return name;
    }
    
    validateAddress(address){
        const baseRegex = /^[A-Za-z0-9\s]{4,}$/;
        if(!baseRegex.test(address)){
            throw new Error("Invalid Address: Address should contain atleast 4 characters");
        }
        return address;
    }

    validateState(state){
        const baseRegex = /^[A-Za-z0-9\s]{4,}$/;
        if(!baseRegex.test(state)){
            throw new Error("Invalid State: State should contain atleast 4 characters");
        }
        return state;
    }

    validateCity(city){
        const baseRegex = /^[A-Za-z0-9\s]{4,}$/;
        if(!baseRegex.test(city)){
            throw new Error("Invalid City: City should contain atleast 4 characters");
        }
        return city;
    }

    validateZip(zip){
        const zipRegex = /^[1-9][0-9]{5}$/;
        if(!zipRegex.test(zip)){
            throw new Error("Invalid zip: Enter a valid zip");
        }
        return zip;
    }

    validatePhoneNumber(phoneNumber){
        const phoneNumberRegex = /^\+?([0-9]{1,3}[-. ])?[0-9]{10}$/;
        if(!phoneNumberRegex.test(phoneNumber)){
            throw new Error("Invalid Phone Number");
        }
        return phoneNumber;
    }

    validateEmail(email){
        const emailRegex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            throw new Error("Invalid Email Address");
        }
        return email;
    }

    toString() {
        return `firstname: ${this.firstName}, lastname: ${this.lastName}, state: ${this.state}, city: ${this.city}, address: ${this.address}, zip: ${this.zip}, phone number: ${this.phoneNumber}, email: ${this.email}`;
    }

}

try{
    let addressBook1 = new AddressBook();
    let contact1 = new AddressBookContact("Abhay", "Shrivastava", "Rajiv Nagar 123", "Bhopal", "Madhya Pradesh", 462021, "+91-6265581172", "abhay123@gmail.com");
    let contact2 = new AddressBookContact("Ankit", "Kumar", "Sarojini Nagar 123", "Pune", "Maharashtra", 411223, "1234567890", "ankitk123@gmail.com")
    let contact3 = new AddressBookContact("Aman", "Rai", "BK road 123", "Mumbai", "Maharashtra", 311455, "0987654321", "amanrai123@gmail.com")
    addressBook1.addContact(contact1);
    addressBook1.addContact(contact2);
    addressBook1.addContact(contact3);

    console.log("Before sorting:", addressBook1.contacts);

    // addressBook1.sortByCityStateZip("city");
    // console.log("After sorting by city:", addressBook1.contacts);

    addressBook1.sortByCityStateZip("state");
    console.log("After sorting by state:", addressBook1.contacts);

    addressBook1.sortByCityStateZip("zip");
    console.log("After sorting by zip:", addressBook1.contacts);
} catch(error){
    console.error(error.message);
}