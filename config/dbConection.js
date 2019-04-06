const mysql=require('mysql');

module.exports= ()=>{
  return mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'SamGooApo123/*-',
      database: 'db_unsaac'
    }
  )
}
