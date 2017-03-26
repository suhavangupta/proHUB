import sys
from app_controller import app

try:
	port = sys.argv[1]
	port = int(port)
	if __name__ == "__main__":
		print "server at port ",port
		app.run(host = '0.0.0.0',port = port,debug  = True)
except:
	if __name__ == "__main__":
		print ("server at port 8000")
		app.run(host = '0.0.0.0',port = 8000,debug = True)

