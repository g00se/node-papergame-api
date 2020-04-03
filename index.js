const request = require('request-promise');


var vk_id = 123;
var api_token = 'apitoken';


module.exports = class PaperGameAPI {
   
    constructor(token, vkid) {
        
        if (!token) throw new Error('token');
        if (!vkid) throw new Error('vkid');

        this.api_token = token;
        this.vkid = vkid;

    }
    /*
	* Отправить рулоны
	* id - кому 
	* summa - целое число, сумма перевода
	* cb - ответ сервера
	*/
    send(id,summa,cb){

    	request(
    		'https://paper.12kot3k.ru/api.php',
    		{   
    			headers: {
    				'Content-Type': 'application/json'
    			},
    			body: {
    				method: 'send_score',
    				token: this.api_token,
    				to: id,
    				amount: summa
    			},
    			json: true,
    			method: 'POST'
    		}
    		).then((response)=>{
    			//console.log(response);
    			cb(response);
    			 // {"success":true,"amount":100,"to":"{ID кому}","current":56}

    		});
    	}
    	/*
* Получить баланс
* id - чей баланс узнать
* cb - ответ от сервера
*/
  score(id,cb){
  request(
    'https://paper.12kot3k.ru/api.php',
    {   
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
       method: 'score',
       token: this.api_token,
       id: id
     },
     json: true,
     method: 'POST'
   }
   ).then((response)=>{
    cb(response.score);
  });
 }
 // {"success":true,"score":"10568"}

 /*
 * Получить список переводов
 * last_tx_id - номер последнего перевода после которого показать переводы
 *
 */
 	txList(last_tx_id,cb){

    request(
            'https://paper.12kot3k.ru/api.php',
            {   
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
   method: 'tx_list',
   token: this.api_token,
   lastTx:((last_tx_id)? last_tx_id : 0)
},
                json: true,
                method: 'POST'
            }
        ).then((response)=>{
          
          if(txs.success){
          	var txs = response['tx_list'];
          	cb(false,txs);
          }else {
          	cb(new Error('Не удалось получить txList'));
          }

          
      });
 }

//  {
// "success": true,
// "tx_list": [
// {
// "id": "39",
// "from": "422584481",
// "to": "294109637",
// "score": "2000",
// "created": "2020-02-12 21:27:09"
// },
// {
// "id": "38",
// "from": "422584481",
// "to": "294109637",
// "score": "1000",
// "created": "2020-02-12 21:27:09"
// }
// ]
// }


/*
* Получить ссылку на перевод
* summa - сумма
*/
get_link(summa){
	if(summa){
		return "https://m.vk.com/app7361871#t"+this.vkid+"_"+summa;
	}else {
		return "https://m.vk.com/app7361871#t"+this.vkid;
	}
  
}


};



