---
title: "Port Security on a CISCO Switch"
date: 2023-01-12
tags: ["switching"]
summary: "As mentioned in my previous post, port security what is it? why do we use it? why do we need it? how is it configured? this post will answer all those..."
readTime: "2 min"
---

As mentioned in my previous post, port security what is it? why do we use it? why do we need it? how is it configured? this post will answer all those questions.  
What is port security? As the name implies this is when one configures a switch port to be somewhat secure that is to say add some security to the port. We use this to keep our switches secure from malicious people and sometimes from regular users who may innocently harm the network.  
How is it configured? I will use screenshots to show the commands one uses to configure port security, its options, and how each option works.

![](/images/2023/01/screenshot-from-2023-01-12-19-24-08.png)

Firstly we move to the port where we want to configure port security. The commands can be in any particular order it doesn't matter, the first command simply means when the switch learns a mac address it should stick with the switch that is to say it's saved. The second command simply means the number of mac addresses you want that switch port to learn, if it's one like what I did it means if a different mac address is detected on that port it will trigger the violation.  
Finally, we have the violation, this is telling the switch what to do when an unauthorized mac address is connected to the port. There are 3 violation options which are as follows:

![](/images/2023/01/screenshot-from-2023-01-12-19-28-16.png)

Protect, this violation mode doesn't send a message to the screen or shut down instead the device will be allowed to keep on sending frames or whatever traffic but the switch will just drop whatever is sent so it's like the user is connected but can't do anything.  
Secondly, we have the restrict mode this mode is very similar to the protect mode the difference is it will generate log messages and the security violation count will increment.  
Lastly, we have the shutdown mode, here the switch will generate a log message and then put the port on err-disable mode which is basically disabling a port, the only way to bring the port back up is by shutting it down and then switching it up again.  
That's all on the port security I did in my first lab.  
I forgot to mention that I always save my configurations to the NVRAM using the following command.

![](/images/2023/01/screenshot-from-2023-01-12-19-39-00.png)

Thank you for reading.
