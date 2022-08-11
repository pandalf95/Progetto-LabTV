function controllaMail(x) { 

    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.value);

} //Controllo se la mail inserita abbia un formato valido e restituisco true o false

