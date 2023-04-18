Through MongoDB-tools, we can backup and restore the entire database. 
Here is how to use it:

1. Open a shell in the “MongoDB-tools\bin” folder.

****************************************************************************
* <database name> is the name of a database you want to backup and restore *
****************************************************************************

2. Backup a database: .\mongodump --db <database name> --out ./backup/ 

3. Now The database has been backed into the “MongoDB-tools\bin\backup” folder.

4. Restore a database:  1. create a database called <database name>
				2. put the backup folder in the bin folder
				2. .\mongorestore --db <database name> --dir ./backup/<database name> --drop


eg: 
.\mongodump --db plan_my_plate --out ./backup/
.\mongorestore --db plan_my_plate --dir ./backup/plan_my_plate --drop
