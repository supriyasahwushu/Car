import { LightningElement,track,wire } from 'lwc';
import getAllCars from '@salesforce/apex/EbikeController.getAllCars';
import searchCars from '@salesforce/apex/EbikeController.searchCars';
export default class CarList extends LightningElement {
    
	@track Cars;
    @track error;
    
   // searchTerm= '';
    //@wire(searchCars,{searchTerm: '$searchTerm'})
    //Cars;
    
	handleSearchTermChange(event) {
		//window.clearTimeout(this.delayTimeout);
        const searchboxVal= event.target.value;
        //alert('boxvalue'+searchboxVal);
        searchCars({
            searchTerm:searchboxVal
        }).then(data=>{
            //alert('data==>'+data);
            
            this.Cars=data;

        }).catch(error=>{
            this.error=error;
        });
    }
    
	connectedCallback() {
		this.loadCars();
    }
    
	loadCars() {
		getAllCars()
			.then(result => {
				this.Cars = result;
			})
			.catch(error => {
				this.error = error;
			});
	}
}