---
title: "Hacking into a Kioptrix Lvl_1 Server"
date: 2024-03-25
tags: ["security"]
summary: "In this post I'll be doing some \"hacking\" I will be demonstrating how I got access to a kioptrix Server. First and foremost this is for educational..."
readTime: "11 min"
---

In this post I'll be doing some "hacking" I will be demonstrating how I got access to a kioptrix Server.  
First and foremost this is for educational purposes moreover Kioptrix is used to practice hacking skills, do not go around doing this on machines where you are not authorized to do so because you'll be punished, rightfully so.  
I won't go through the installations but I have a kioptrix level 1 server installed which is going to be the target machine and then we have Kali Linux which I will use to attack the server, these machines are all installed by VMWare so they are in the same network which is going to make things a whole lot easier than it would be.  
The first thing I have to do is try to find the IP address of the target machine and I used the arp command as follows.

![](/images/2024/03/2024-03-19_15-42.png)

Now we press enter to run the command...

![](/images/2024/03/2024-03-19_15-43.png)

…we run into an error, which means we don't have permission to run this command which means we need sudo privileges, I won't explain what sudo is, just a Google search will give you the answer. I can say this was the first challenge I ran into even though it was minor and a silly mistake from me but it's important to use sudo on some commands unless you logged in as the root. I then ran the command with sudo and this is how I did it and what the results look like.

![](/images/2024/03/2024-03-19_15-43_1.png)

After running the ARP scan we can tell which IP address might belong to the server because firstly .1 and 2 are usually reserved for the gateway and so on, then .254 usually is reserved to send packets to all devices in the network, so with that, we can come to the conclusion that .128 is our target. Next is to try and see if we can connect to the target, we use the ping command to test reachability.

![](/images/2024/03/2024-03-19_15-53.png)

And we are getting a reply from the target. Now on to the next step…We have to scan our target which is usually the first step of a hack, we are trying to see which ports the target has opened, which OS they use, and so on with the hopes that from the scan results, we can get information that can help exploit the system. Here is the syntax for nmap which I used…

![](/images/2024/03/2024-03-19_16-02.png)

Now a bit of explanation on the command used, Nmap is the keyword for using Nmap, and then we follow it up with flags, the first flag is -T4 this is the flag we use to tell Nmap how fast it should run the scan, well I used 4 because the person that taught me also used it but I have read about the other speeds and 4 is okay for this since it's just practice. We then have -p- this simply means scan all ports, we can do the scan without that flag but Nmap will only scan the first 1000 known ports which will leave out the other 64000 ports, and who knows maybe we could've found something on port 40000, you can also specify the port number, tell Nmap which port specifically to scan. Lastly -A flag is for aggressive scanning this means giving me everything on the target, the target OS, version, script, and traceroute. Now we run the command…

![](/images/2024/03/2024-03-19_16-13.png)

And now we wait for Nmap to do it's thing.

![](/images/2024/03/2024-03-19_16-15.png)
![](/images/2024/03/2024-03-19_16-16.png)

Now these can be overwhelming results but this is the important stuff this is where our hack begins, we have to read these results carefully to see where we can go from here.  
We pay attention to the "open" ports, those are the ports we can try and exploit and from the NMAP scan, there are multiple ports opened. We will start with ports 80/443 which are HTTP and HTTPS. When it comes to HTTP and HTTPS it's usually good to go to that particular website, in this instance, we use the IP address to check the webpage maybe we can find something there.

![](/images/2024/03/2024-03-24_19-25.png)

The IP address leads us to a default web page, and this is very important, it can give us a lot of useful information for example we now have an idea of what the client is using because we can see it's running APACHE and most likely using Red Hat Linux, this is something we can use when exploiting because we now know what type of exploits we should use which can run on APACHE and Red hat.  
There is not much to work with on the page, not much to click on but some pages may do, here we have a few links we go through them to see if we can find even breadcrumbs on each, I clicked the documentation hyperlink and it led to this…

![](/images/2024/03/2024-03-24_19-34.png)

This may look useless since it's a 404 but no it's not, this page has confirmed to us that the target machine is running Apache/1.3.20 server and we have its port. We keep on gathering information and writing down what we get for future reference.  
Next, we use Nikto for more scanning, what is Nikto? well in simple terms it is a vulnerability scanner for web servers, it also checks outdated versions of software running on a server. From what I have heard Nikto is very loud when scanning which means a target with good security in place will detect it and block it but here since it's a lab and I am still a noob I can use it. Firstly I tried scanning using Nikto and HTTPS but for some reason, it failed so I tried with HTTP and that's when it worked, here is the syntax for Nikto.

![](/images/2024/03/2024-03-25_13-21.png)

We use the -h to specify the hoster which is the kioptrix server, next are the results of the scan, they can be overwhelming but here they are...

![](/images/2024/03/2024-03-25_13-26.png)

We can go through the results and we can see a lot of information for example we see that Apache 1.3.20 is outdated, so mod\_ssl is vulnerable and so on, these vulnerabilities are very important because it's where we can start trying to exploit the server.  
After the nikto scan I used Burp suite to check if I could find more information but this time I couldn't find anything I hadn't found yet, I used Burp because when it comes to web enumeration it's very important. I also ran a dirbuster but again I barely found anything new so now we moving to the next open port which is SMB, which is on port 139.  
What is SMB? Service Message Block is a file share protocol. Firstly we use a tool called Metasploit, which is an exploitation framework, I won't go through its definition and explanations those can be googled, but we run Metasploit which is what we going to try to utilize to exploit SMB. The first thing we do is open Metasploit like so.

![](/images/2024/03/2024-03-25_16-35.png)

First thing is first we search for what we are after and in this case it's SMB.

![](/images/2024/03/2024-03-25_16-43.png)

This search will bring quite a bit of results and we should know what we want from Metasploit. The results are structured in this way type of module/platform/service/action. In this case, we are looking for enumeration modules which are auxiliary modules so it kinda makes our search a bit easier. For starters here are the results of the search.

![](/images/2024/03/2024-03-25_16-56.png)
![](/images/2024/03/2024-03-25_16-56_1.png)
![](/images/2024/03/2024-03-25_16-57.png)
![](/images/2024/03/2024-03-25_16-57_1.png)

Again the results can be overwhelming, this is mainly because the method I used for searching is the worst but this is for demonstration, so we are looking for an auxiliary module that can help us scan and at 111 we have something that looks like it can get the job done.

![](/images/2024/03/2024-03-25_17-00.png)

On the description it says "SMB version detection" so this may be what we need, now to use this module.

![](/images/2024/03/2024-03-25_17-02.png)

I used the number instead of typing out the whole module and as you can see the console is now saying (scanner/smb/smb\_version), now time to check our info and options.

![](/images/2024/03/2024-03-25_17-04.png)

With the info command, we get well the information of the module we are running and we can see this module is for SMB version detection, we check the options which are things we need to input for the module to work.

![](/images/2024/03/2024-03-25_17-07.png)

We can see this module needs RHOSTS to run this is where we input the host or host's IP addresses, we are telling the module this is our target, then threads have a setting of 1 which is okay for now. Next, we set up the host which is the target IP address.

![](/images/2024/03/2024-03-25_17-09.png)

Now we run the module...

![](/images/2024/03/2024-03-25_17-12.png)

The results look small and you may think they are nothing but we found something important, something we can use, that line with the Unix (Samba 2.2.1a) means we know the version and we now know where to start when we doing our research.  
Next, we try to check for file shares available on the SMB client, and for that, we use the Smbclient tool and this is how it goes.

![](/images/2024/03/2024-03-25_17-23-1.png)

The L is us telling smbclient to list the file shares available.

![](/images/2024/03/2024-03-25_17-24.png)

And we see we have a bit of information, we keep on getting that this server uses Samba which means we are in the right direction. Now we have 2 shares and these are IPC$ and ADMIN$, we are usually interested in the admin share but we'll try both just in case.

![](/images/2024/03/2024-03-25_17-29.png)

We can't get through the ADMIN$ share which, now just to try our luck we go for the IPC$ share.

![](/images/2024/03/2024-03-25_17-32.png)

We got something! we have a shell, this shell is very similar to the linux command line so let's see what we can do, first and foremost let's list what we have.

![](/images/2024/03/2024-03-25_17-33.png)

And just like that our happiness is cut short, there is nothing we can do here access is denied which means we hit a dead end, it's not the end of the world, you have to expect such things otherwise everyone would "hack" if it was that easy. Well, we have gotten quite a bit of information now we have to try and enumerate SSH since SMB had a dead end.  
There is not much to do when it comes to SSH besides trying to SSH into the server, hoping to find a banner that may contain some information then trying to brute force or password spraying in this case when I ran the SSH there was no banner but still our NMAP scan gave us the ssh version used which is a find in itself.  
Next is research, yes more research this is not Hollywood where you type on a terminal and "I'm in" We have to do more research on our findings from enumarations. Here you need to utilize your Google search skills.  
I won't explain or go read my research because it's almost impossible to explain research, I have to go to multiple sites and so on to find exploits but one has to use the information gathered and try to look for exploits on those. Now onto the final part which is the exploitation.  
Just a brief touch on shells before I do exploitation is to quickly explain the two types of shells which are reverse shell and blind shell. A reverse shell is when we initiate the connection to the target whilst a blind shell is where the target initiates the connection, this means we open a port and the target initiates the connection whilst in the reverse shell we use a port opened on the target to initiate the connection. Sometimes we'll use reverse and likewise, sometimes we'll use blind shell it's important to try another exploit when one fails for example we may run a reverse shell exploit and if it fails we can try the blind shell one.  
Next is the payloads where we have 2, staged and non-staged payloads, the difference between the 2 is on their names, staged sends the payload in stages so it will say windows/meterpreter/reverse\_tcp and that's 2 stages whilst a non-staged would say windows/meterpreter\_reverse\_tcp. We can see the difference, staged payloads can be less stable whilst non-staged are usually bigger in size. Sometimes one payload will work and sometimes it won't hence if one fails you can try using the other one.  
Now we go back to Metasploit, I used the results of my research to find a payload, and here is what I used.

![](/images/2024/03/2024-03-25_18-09.png)

Now from our information gathering we know that our target runs linux which means we'll run the linux module like so.

![](/images/2024/03/2024-03-25_18-11.png)

It set a defaulr payload for us which is a staged payload, now we set the RHOST which is our target machine.

![](/images/2024/03/2024-03-25_18-11-1.png)

Now let's run the exploit!

We can actually use "exploit" instead of run like so.

![](/images/2024/03/2024-03-25_18-14.png)
![](/images/2024/03/2024-03-25_18-15.png)

Our exploit runs but it keeps on dying, now remember what we said about payloads, since it set a staged payload for us by default let's try a non-staged one. We type set payload and double tab to see the options.

![](/images/2024/03/2024-03-25_18-17.png)

and the payload before the last is very similar to the one used but its a non-staged payload so let's try it.

![](/images/2024/03/2024-03-25_18-20.png)

Now let's run it and see, this time I'll use run instead of exploit.

![](/images/2024/03/2024-03-25_18-21.png)

And..."we are in!" let's try out some commands.

![](/images/2024/03/2024-03-25_18-23.png)
![](/images/2024/03/2024-03-25_18-24.png)

And we are now the root, which means we can do anything with this machine, mission complete.  
This was an automatic exploitation with Metasploit, this can be done manually with brute force and so on but this article is already long enough so I won't touch on this.  
That's about it and that is how I opened my first shell on a Kioptrix level 1 server, see you on the next.
