db.finan_future_agri_comm.find({},{"title":1,"_id":0,"dtime":1,"content":1}).sort({"dtime":-1})
#db.finan_future_agri_comm.remove()
db.finan_future_agri_comm.find({},{"title":1,"_id":0,"dtime":1}).sort({"dtime":-1}).count()