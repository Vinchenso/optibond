import Component from '@ember/component';
import Paydown from 'paydown'
// import { computed } from '@ember/object'

export default Component.extend({
  classNames: ['loan-table'],

  configValues: {
  "start_date"             : "1.1.2019",
  "end_date"               : "30.6.2020",
  "principal"              : 100000,
  "rate"                   : 3.5,
  "recurring":
    {
     "amount"              : 10000,
     "first_payment_date"  : "31.1.2019",
     "payment_day"         : 31
    }
  },  
  payments_array: [],
  rval_obj: '',

  init() {
    this._super(...arguments)
    const calculator = new Paydown()
    this.rval_obj = calculator.calculate(this.configValues,"", this.payments_array);
  },

});
