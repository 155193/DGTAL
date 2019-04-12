create database documents;
use documents;

create table document(
  id int not null primary key auto_increment,
  id_nodo text not null,
  title varchar(100),
  commi text,
  data LONGBLOB,
  data_created DATETIME default current_timestamp,
  data_modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
