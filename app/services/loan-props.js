import Service from '@ember/service';
import Paydown from 'paydown'
import { observer, computed } from '@ember/object'

export default Service.extend({

  calculator: null,
  start_date: null,
  end_date: null,
  principal: null,
  rate: null,
  recurring: null,
  day_count_method: null,
  events_array: null,
  payments_array: null, 
  rval_obj: null, 

  init() {
    this._super(...arguments)

    this.calculator = new Paydown() 
    this.reset()
    this.rval_obj = this.calculator 
                      .calculate(this.loanParams,"", this.payments_array);

  },

  reset() {
    this.set('payments_array', []) 
    this.set('start_date', '1.1.2019' ) 
    this.set('end_date', '30.6.2020' ) 
    this.set('principal', 300000)
    this.set('rate', 3.5)
    this.set( 'recurring', {
        "amount"              : 10000,
        "first_payment_date"  : "31.1.2019",
        "payment_day"         : 31
    })

  },  

  loanParamsChanged: observer('loanParams', function() {
    this.rval_obj = this.calculator.calculate(this.loanParams,"", this.payments_array);
  }),

  loanParams: computed(
    'start_date'
    ,'end_date'
    ,'recurring'
    ,'rate'
    ,'principal', function() {
      return {
        "start_date": this.start_date,
        "end_date": this.end_date,
        "principal": this.principal,
        "rate": this.rate ,
        "recurring": this.recurring,
      } 
    }
  ),

});
