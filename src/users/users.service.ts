import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {

    const email = createUserDto.email
    const phoneNumber = createUserDto.phoneNumber


    if (!createUserDto.email && !createUserDto.phoneNumber) {
      return new BadRequestException("Please Provide either Phone Number or email id ")
    }

    // this.usersRepository.query(`delete from contact where email = 'akshay.quest.com'`)
    // return3
    


    if (createUserDto.email && !createUserDto.phoneNumber) {

      let contacts = await this.getUsers(email, null)

      console.log("contacts");
      console.log(contacts);
      

      if (contacts.length === 0) {
        return new BadRequestException("No User Found With this email and for creating new one email and phone number both required")
    }

    } else if ( !createUserDto.email && createUserDto.phoneNumber) {

      let contacts = await this.getUsers(null, phoneNumber)
      
      console.log("contacts");
      console.log(contacts);
      

      if (contacts.length === 0) {
        return new BadRequestException("No User Found With this phone Number and for creating new one email and phone number both required")
      }
      
      return "phone but not email"

      
    } else {

      let contacts = await this.getUsers(email, phoneNumber)

      if (contacts.length === 0) {
        
        let newCreatedUser = await this.createNewContact(createUserDto)

        return {
          "contact":{
            "primaryContatctId": newCreatedUser.id,
            "emails": [newCreatedUser.email], // first element being email of primary contact 
            "phoneNumbers":  [newCreatedUser.phoneNumber] ,// first element being phoneNumber of primary contact
            "secondaryContactIds": []  // Array of all Contact IDs that are "secondary" to the primary contact
          }
        }       
      }

      return this.getResultWhenBothEmailAndNumber(contacts, email, phoneNumber, createUserDto)

      }
    
    return 'This action adds a new user';
  }

  async getUsers(email, phoneNumber) {

    let contacts
    // console.log(await this.usersRepository.query(`select * from contact`))
    

    if (email != null && phoneNumber != null) {
      contacts = await this.usersRepository.query(`select * from contact where email = (?) or phoneNumber = (?)`, [email, phoneNumber])
    } else if (phoneNumber != null) {
      contacts = await this.usersRepository.query(`select * from contact where phoneNumber = (?)`, [phoneNumber])
    } else {
      contacts = await this.usersRepository.query(`select * from contact where email = (?)`, [email])
    }

    return contacts
  }
  
  async createNewContact(createUserDto) : Promise<User> {
  
    const date = new Date(); // Replace this with your actual date or datetime value
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    
    let createdAt = format(date, 'yyyy-MM-dd HH:mm:ss');
    let updatedAt = format(date, 'yyyy-MM-dd HH:mm:ss');
    let linkPrecedence = "primary"

    let email = null
    let phoneNumber = null

    if (createUserDto.email) {
      email = createUserDto.email
    }

    if (createUserDto.phoneNumber) {
      phoneNumber = createUserDto.phoneNumber
    }

    const user = this.usersRepository.create({ email, phoneNumber, createdAt, updatedAt, linkPrecedence });    
    
    return this.usersRepository.save(user);

  }
  
  async createSecondaryContact(createUserDto, primaryContactId) : Promise<User> {
  
    const date = new Date(); // Replace this with your actual date or datetime value
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    
    let createdAt = format(date, 'yyyy-MM-dd HH:mm:ss');
    let updatedAt = format(date, 'yyyy-MM-dd HH:mm:ss');
    let linkPrecedence = "secondary"
    let linkedId = primaryContactId

    let email = null
    let phoneNumber = null

    if (createUserDto.email) {
      email = createUserDto.email
    }

    if (createUserDto.phoneNumber) {
      phoneNumber = createUserDto.phoneNumber
    }

    const user = this.usersRepository.create({ email, phoneNumber, createdAt, updatedAt, linkPrecedence, linkedId });    
    
    return this.usersRepository.save(user);

  }

  async getResultWhenBothEmailAndNumber(contacts, email, phoneNumber, createUserDto) {
    
    let primaryContacts = []
    let secondaryContactIds = []
    let secondaryEmailArray = []
    let secondaryPhoneNumbersArray = []

    let primaryContactCount = 0
    let newAccountToBeCreated = true

    for (let contact of contacts) {


      if (contact.linkPrecedence === 'primary') {
        primaryContactCount += 1
        primaryContacts.push(contact)
      }  else {
        secondaryContactIds.push(contact.id)
        secondaryEmailArray.push(contact.email)
        secondaryPhoneNumbersArray.push(contact.phoneNumber.toString())
      }

      if (contact.email == email && contact.phoneNumber == phoneNumber) {
        newAccountToBeCreated = false
      }     
    }

    let primaryContactId
    let emailsArray = []
    let phoneNumbersArray = []
    

    if (primaryContactCount === 1) {

      primaryContactId = primaryContacts[0].id

      if (newAccountToBeCreated == true) {
  
        let newCreatedUser = await this.createSecondaryContact(createUserDto, primaryContactId)  // As primary contact count is 1
        secondaryContactIds.push(newCreatedUser.id)
        secondaryEmailArray.push(newCreatedUser.email)
        secondaryPhoneNumbersArray.push(newCreatedUser.phoneNumber.toString())
      
      }
      emailsArray.push(primaryContacts[0].email)
      emailsArray.push(...secondaryEmailArray)
      
      phoneNumbersArray.push(primaryContacts[0].phoneNumber)
      phoneNumbersArray.push(...secondaryPhoneNumbersArray)        

    } else { // create one as primary account

      let firstPrimaryContact = primaryContacts[0]
      let secondPrimaryContact = primaryContacts[1]

      if (firstPrimaryContact.id < secondPrimaryContact.id) {
          primaryContactId = firstPrimaryContact.id

          secondaryContactIds.push(secondPrimaryContact.id)
          secondaryEmailArray.push(secondPrimaryContact.email)
          secondaryPhoneNumbersArray.push(secondPrimaryContact.phoneNumber.toString())
          
          emailsArray.push(firstPrimaryContact.email)
          emailsArray.push(...secondaryEmailArray)
          
          phoneNumbersArray.push(firstPrimaryContact.phoneNumber)
          phoneNumbersArray.push(...secondaryPhoneNumbersArray)        
  

      } else {
          primaryContactId = secondPrimaryContact.id

          secondaryContactIds.push(firstPrimaryContact.id)
          secondaryEmailArray.push(firstPrimaryContact.email)
          secondaryPhoneNumbersArray.push(firstPrimaryContact.phoneNumber.toString())
          
          emailsArray.push(secondPrimaryContact.email)
          emailsArray.push(...secondaryEmailArray)
          
          phoneNumbersArray.push(secondPrimaryContact.phoneNumber)
          phoneNumbersArray.push(...secondaryPhoneNumbersArray)        
  
      }
    }

    return {
      "contact":{
        "primaryContatctId": primaryContactId,
        "emails":  [...new Set(emailsArray)], // first element being email of primary contact 
        "phoneNumbers": [...new Set( phoneNumbersArray)] ,// first element being phoneNumber of primary contact
        "secondaryContactIds": secondaryContactIds  // Array of all Contact IDs that are "secondary" to the primary contact
      }
    }     

  }

}
