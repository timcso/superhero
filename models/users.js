var db, Users, Orders,
    models = {};
var mongoose = require('mongoose')

function setConnection( mongodb){
    db = mongodb;
    setModel();
}

function setModel(){

    var Schema = mongoose.Schema;
    var userSchema = new Schema({
       name: String,
       phone: String,
       email: String,
       address: String,
       role: Number,
       meta: {
          birthdate: Date,
          hobby: String
       },
       orders: [{ type: Schema.Types.ObjectId, ref: 'Orders'}]
    })
    userSchema.statics.isAdmin = function(r,callBack){
      return this.find({'role': {$lte: 2}}, callBack)
    }

    Users = db.model( 'Users', userSchema, 'Users');

    var orderSchema = new Schema({
       _creator: {type: Schema.Types.ObjectId, ref: 'Users'},
       product: String,
       insDate: Date,
       description: String,
       amount: Number,
       deadLine: Date
    })

    Orders = db.model( 'Orders', orderSchema, 'Orders');

    models['Users'] = Users;
    models['Orders'] = Orders;
}

function getModel( modelName ){
    if (modelName){
      return Users
    }else{
      return models[modelName];
    }
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
    first: first,
    getModel: getModel
}
