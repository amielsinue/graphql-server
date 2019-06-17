by default the users using tenant_key will have all access

only restricted users will have to use JWT


Create Schema

We are going to create public and private



tenant_key = test_one
default_user = test_one
env
    MINT_PASSWORD_KEY decript passwords from mint_access_control
    MINT_DBHOST_READ access to mint_access_control db
    MINT_DBHOST access to mint_structured_data

server.py test_one

database1 = mint_access_control
    we can only access with the pgpass as mint user
    query to get user pass for the default user "test_one" 
    decript pass using MINT_PASSWORD_KEY
    
database2 = mint_structured_data

 --connection postgres://test_one:test_one_password@localhost/mint_structured_data -s test_one

check how to specify the schemas (array?)


handle unix 
    SIGNINT - handle graceful shutdown
    SIGHUP - reload 
 
 
Add those to the tenants table
```
ALTER TABLE tenants
ADD COLUMN default_db_user_for_graphql text,
ADD COLUMN db_password_for_graphql text,
ADD COLUMN graphql_jwt_secret text;
 ,
 db_password_for_graphql text,  -- encrypted
 graphql_jwt_secret text - jwt
```

```
npx postgraphile -a -b -j -M \
   -c ’postgres://{tenant_key}_read:@{os.environ[‘PGHOST’]}:5432/mint_db’ \
   -s graphile_auth,{tenant_key},public  \
   {{% if var.value.{tenant_key}_graphile_local == ‘true’ -%}}
   -n {local_ip_address} \
   {{% endif -%}}
   -p {{{{ var.value.{tenant_key}_graphile_port }}}} \
   -t “graphile_auth.jwt_token” -e the_secret -r graphile_auth
```


```
create database mint_data;
```

Create db user and provide privileges
```
CREATE USER mint_admin WITH ENCRYPTED PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE mint_data TO mint_admin;
```

Creating a hidden schema
```
CREATE SCHEMA hidden;
```

Createing users table withing that schema
```
CREATE TABLE hidden.users (
  id INT,
  email VARCHAR 
);

CREATE TABLE hidden.user_profile (
  id INT,
  user_id INT,
  first_name VARCHAR,
  last_name VARCHAR   
);

SET search_path TO "$user",public,hidden;
```

Creating jws_token type and authenticate function to be able to 
create JWT 

```
create type hidden.jwt_token as (
  id integer,
  exp integer,
  email text
);

create function public.authenticate(
  email text
) returns hidden.jwt_token as $$
declare
  account hidden.users;
begin
  select u.* into account
    from hidden.users as u
    where u.email = authenticate.email;

  if account.id is not null then
    return (
      account.id,
      extract(epoch from now() + interval '7 days'),      
      account.email
    )::hidden.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;
```


TODO:
Create tables that have users permissions
``` 
CREATE TABLE hidden.users_data (
  id INT,
  text VARCHAR 
  user_id INT
);

```