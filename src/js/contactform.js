

const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactMail = document.getElementById('contact-mail');
const contactComment = document.getElementById('contact-comments');
const contactMessage = document.getElementById('contact__message');
const contactParrafo = document.getElementById('form__parrafo--on'); // Se agrego este

let popup = document.getElementById('popup');

const sendEmail = (e)=>{
    e.preventDefault()

    //contactMessage.classList.remove('contact__message');
    //Check if the field has a value
    if(contactName.value === '' || contactMail === '' || contactComment.value === ''){
        contactMessage.classList.remove('color-blue');
        contactMessage.classList.remove('color-red');

        //Show Message
        contactMessage.textContent = 'Llena todos los campos';
    }else{
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_wnkc01a','template_gmv5p25','#contact-form','MtSb6sXQj4SCRXi-O')
            .then(()=>{
                popup.classList.add('open-popup');
                //contactParrafo.classList.remove('form__p');
                //contactParrafo.classList.add('form__p--on');
                //contactMessage.classList.remove('contact__message_off');
                //contactMessage.classList.add('contact__message')
                //contactMessage.classList.add('color-blue')
                //contactMessage.textContent = 'Mensaje Enviado'

                setTimeout(()=>{
                    popup.classList.remove('open-popup');
                    //contactParrafo.classList.remove('form__p--on');
                    //contactMessage.classList.add('form__p');
                    //contactMessage.classList.remove('contact__message')
                    //contactMessage.classList.add('contact__message_off');
                    //contactMessage.textContent = ''
                    
                    
                }, 5000)
            }, (error) =>{
                alert('Algo ha fallado...', error)
            })

            //contactMessage.classList.remove('contact__message')
            contactName.value = ''
            contactMail.value = ''
            contactComment.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail)