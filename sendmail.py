import smtplib

def sendEmails():
    sender = "pictprohub@gmail.com"
    receivers = ["pictprohub@gmail.com"]
    yourname = "proHUB team"
    recvname = "receptionist"
    sub = "Testing email"
    body = "Welcome to proHUB" + "\n\n" + "Let's get to work and make world a better Place!"
    message = "From: " + yourname + "\n" 
    message = message + "To: " + recvname + "\n"
    message = message + "Subject: " + sub + "\n" 
    message = message + body

    try:
        print "Sending email to " + recvname + "...",
        server = smtplib.SMTP(host='smtp.gmail.com', port=587)
        username = 'pictprohub@gmail.com'  
        password = 'prohubteampict'  
        server.ehlo()
        server.starttls()  
        server.quit().login(username,password)  
        server.sendmail(sender, receivers, message)         
        server.quit()
        print "successfully sent!"
    except  Exception:
        print "Error: unable to send email"