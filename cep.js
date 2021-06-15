console.log('======== CEP =========');

// IIFE
(function () {

    // UI

    const ui = {
        postalCode: document.querySelector('#cep'),
        street: document.querySelector('#logradouro'),
        neighborhood: document.querySelector('#bairro'),
        city: document.querySelector('#cidade'),
        state: document.querySelector('#estado')
    };

    
    
    //  ACTIONS

    const onlyNumbers = function (e) {
        
        console.log(this.value);

        let v = this.value.replace(/[^0-9]+/g, "");
        this.value = v.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);

        
    };



    const postalCodeIsValid = function () {
        if (this.value.length === 9) {
            this.classList.remove('error');
            getAddress(this.value);
        } else {
            this.classList.add('error');
            this.focus();
        }

    };



    const getAddress = async function (postalCode) {
        
        // console.log('Busca o Endereço....');
        
        const endpoint = `https://viacep.com.br/ws/${postalCode}/json/`;

        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        try {
            const response = await fetch(endpoint, config);
            const address = await response.json();
            getAddressSuccess(address);
        } catch (error) {
            console.log('Erro tratado....');
            getAddressError(error)
        }

    };

    const getAddressSuccess = function(address) {
        
        const { logradouro, bairro, localidade, uf } = address;

        console.log(address);
        ui.street.value = logradouro;
        ui.neighborhood.value = bairro;
        ui.city.value = localidade;
        ui.state.value = uf;
    }

    const getAddressError = function(error) {
        const p = document.createElement('p');
        p.textContent = 'Falha ao consultar o endereço';
        const div = document.querySelector('fieldset > div');
        div.insertAdjacentElement('beforebegin', p);
    }



    // INITIALIZE / BINDING EVENTS

    ui.postalCode.addEventListener('input', onlyNumbers);
    ui.postalCode.addEventListener('focusout', postalCodeIsValid);
    // ui.postalCode.oninput = onlyNumbers;
    // ui.postalCode.onblur = postalCodeIsValid;
    
})();