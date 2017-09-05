var db, Users;
function setConnection( mongodb){
    db = mongodb;
    setModel();
}

function setModel(){
  Users = db.model( 'Users', {
    name: String,
    phone: String,
    email: String,
    address: String,
    role: Number,
    meta: {
        birthdate: Date,
        hobby: String
    }
  }, 'Users');
}

function read(where, callBack){
    if (!where){
        where = {};
    }
    Users.find( where, function (err, data){
        if (err ){
            console.error('Error in query: ', where );
            data = []
        }

        if(callBack){
           callBack( data )
        }
    })
}

function first(where, callBack){
    read(where, function(data){
        if(data.length > 0){
            callBack(data[0]);
        } else{
            callBack(null);
        }
    })
}

function create(data, callBack){
    var user = new Users(data);
    user.save(function(err){
        if(err){
            console.error('Save error: ', err);
            callBack({});
        } else{
            callBack( data );
        }
    });
}


module.exports = {
    setConnection: setConnection,
    read: read,
    create: create,
    first: first
}
