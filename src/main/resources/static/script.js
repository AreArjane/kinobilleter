/**
 * Oblig 1 DATA1700 Web Programming
 * @author Arjan
 * @file script.js
 */


/**
 * list of filmer conatin key, value
 */
const filmer =  {
    OPTION_1: "Black Magic",
    OPTION_2: "Way to River",
    OPTION_3: "In Winter Day",
    OPTION_4: "Summer Tripe",
    OPTION_5: "American Pie"
};
/**
 * filmselect target (select tag in html doc) 
 * put for each key a value option to select tag in @file billetter.html
 */
const filmSelect = document.querySelector('#filmSet');
Object.keys(filmer).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = filmer[key];
    filmSelect.append(option); 

});
/**
 * array holder oversikt over alle billeter
 */

let biletter = []

/**
 * Validate input with differen function defined. 
 * @class Validator
 */
class Validator {
    /**
     * empty @constructor of class Validator
     */
    constructor() {}

     /**
     * Validates a name for first name field with norwegian letters.
     * @param {string} name - The name to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     * @example name Xu is the first male name in chiness, Per Arne first male name in norwegian
     */
    checkNameFor(name) {
        const nameRegX = /^[a-zåøæA-ZÅØÆ]{2,60}$/;
        if(name == 0) {
            return "Må skrives noen i fornavne"
        }
        if (nameRegX.test(name)) {
            return true;
            
        } else {
            return 'navn er ugyldig';
        }
    }
     /**
     * Validates a name for last name field with norwegian letters.
     * @param {string} name - The name to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     */
    checkNameEtter(name) {
        const nameRegX = /^[a-zåøæA-ZÅØÆ]{2,60}$/;
        if(name == 0) {
            return "Må skrives telefon nummer"
        }
        if (nameRegX.test(name)) {
            return true;
            
        } else {
            return 'navn er ugyldig';
        }
    }

     /**
     * Validates a tlf-nr accourdning to E.164 longest possible with co.code are fifteen digit.
     * @param {string} tlfNr - The nr to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     */
    checkPhoneNumber(tlfNr) {
        const tlfRegX = /^(?:\+|00)\d{11,17}$/;
        if(tlfNr == 0) {
            return "Må skrives noen i epost"
        }
        if (tlfRegX.test(tlfNr)) {
            return true;
            
        } else {
            return 'telefon nummer er ugyldig';
        }
    }
    /**
     * Validates email with only one @ possible, and ending com, co, net or no.
     * @param {string} epost - The email to validate.
     * @returns {boolean|string} True if valid, or an error message if invalid.
     */
    checkEmail(epost) {
        const epostRegX = /^[^@]+@[^@]+\.(?:no|com|co|net)$/;
        if(epost == 0) {
            return "Må skrives noen i Etternavne"
        }
        if (epostRegX.test(epost)) {
            return true;
            
        } else {
            return "ugyldig input";
        }
    }
}
/**
 * Represents a customer with details for a film booking.
 * 
 * @class Kunde
 * 
 * @constructor
 * @param {string} fornavn - The first name of the customer.
 * @param {string} etternavn - The last name of the customer.
 * @param {string} tlf - The telephone number of the customer.
 * @param {string} epost - The email address of the customer.
 * @param {string} film - The film selected by the customer.
 * @param {number} antall - The number of tickets booked by the customer.
 * 
 * @example
 * // Create a new customer with booking details.
 * const customer = new Kunde('Nordmen', 'Ole', '12345678', 'ole.nordmen@example.com', 'Inception', 2);
 */
class Kunde {
    constructor(fornavn, etternavn, tlf, epost, film, antall) {
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.tlf = tlf;
        this.epost = epost;
        this.film = film;
        this.antall = antall;  
    }
    /**
     * Validates customer information and adds to tickets if valid.
     * @returns {object} An object containing a success status and messages.
     */
    opprette() {
        /**
         * instance of @class Validator
         */
        const validator = new Validator();
        
        let validatorResult = {
            fornavn: validator.checkNameFor(this.fornavn),
            etternavn: validator.checkNameEtter(this.etternavn),
            tlf: validator.checkPhoneNumber(this.tlf),
            epost: validator.checkEmail(this.epost)
        };
 
        let error_alert = Object.values(validatorResult).some(msg => msg != true);

        if(error_alert) {
            return {success: false, messages: validatorResult};

        } else {
            
            biletter.push ({
                film: this.film,
                antall: this.antall,
                fornavn: this.fornavn,
                etternavn: this.etternavn,
                tlf: this.tlf,
                epost: this.epost
            });

            return { success: true, messages: "kunde informasjon er lagt til"};
        }
    }
    /**
     * Clears all entries from the biletter array.
     * @static
     */
    static sletteAlt() {
        biletter.length = 0;
    }
}
/**
 * Sets up event listeners for form in @file billetter.html
 * It waits for the DOM to be fully loaded before attaching event listeners to the form for submitting ticket bookings
 * If validation fails with function from @class Kunde.
 * Error messages are displayed when empty. 
 * Otherwise, the booking is added to billeter, and the form is reset.
 * call @static sletteAlt form @class Kunde to delete entire array length and reset tabels.
 */

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector(".bilett-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const fornavn = document.querySelector('#fornavn').value;
        const etternavn = document.querySelector('#etternavn').value;
        const tlf = document.querySelector('#tlf').value;
        const epost = document.querySelector('#epost').value;
        const film = document.querySelector('#filmSet').selectedOptions[0].text;
        const antall = document.querySelector('#antall').value;


        const kunde = new Kunde(fornavn, etternavn, tlf, epost, film, antall);
        let result = kunde.opprette();

        if (!result.success) {
            Object.keys(result.messages).forEach(key =>{
            const errMSG = result.messages[key];

            if (errMSG != true) {
                document.querySelector(`#err-${key}`).textContent = errMSG;
            } else {
                document.querySelector(`#err-${key}`).textContent = '';
            }
         });
        
        } else {
            alert(result.messages);
            this.reset();
            const tbody = document.querySelector('#kunde-liste');
            tbody.innerHTML = '';
            
            biletter.forEach(kunde => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${kunde.film}</td>
                <td>${kunde.antall}</td>
                <td>${kunde.fornavn}</td>
                <td>${kunde.etternavn}</td>
                <td>${kunde.tlf}</td>
                <td>${kunde.epost}</td>
            `;
            tbody.append(tr);
});
         } 
    });

    /**
     * seletteA delete the entire table column content
     */

    const sletteA = document.querySelector("#sletteButton");
    sletteA.addEventListener("click", function(event) {
        
        if(biletter.length === 0) {
            alert("Det er ikke registert noen billeter, vennlig fylle ut formen");
        
        } else {
            
            const userConfirm = confirm("Er du sikker pa slette alle billeter");
            
            if (userConfirm) {
                Kunde.sletteAlt();
                document.querySelector('#kunde-liste').innerHTML ='';
                alert("Alle billeter er slettet");
            
            } else {
                console.log("Sletting avbrutt");
            }
        }
    });
});

/****************
 * END OF CODE */