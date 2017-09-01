var db, Itf;
function setConnection( mongodb){
    db = mongodb;
    setModel();
}

function setModel(){
  Itf = db.model( 'itf', {
    name: String,
    email: String,
    order: {
        date: Date,
        amount: Number,
        status: String,
        product: String
    }
  }, 'itf');
}

function read(where, callBack){
    Itf.find( where, function (err, data){
        if (err ){
            console.error('Error in query: ', where );
            callBack({});
        } else{
            callBack( data );
        }
    })
}

module.exports = {
    setConnection: setConnection,
    read: read
}
