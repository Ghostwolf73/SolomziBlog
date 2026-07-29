---
title: "Create Resource groups with Azure CLI"
date: 2023-09-09
tags: ["cloud"]
summary: "For the first time on this blog, I'm going to post something that's a little different, I'm going to be writing about Azure, I have been learning the..."
readTime: "3 min"
---

For the first time on this blog, I'm going to post something that's a little different, I'm going to be writing about Azure, I have been learning the cloud, Azure to be specific, and I have also been doing some cyber security which I hope to have posts on too in the future.

So today I'm going to be on Azure resource groups, First and foremost what are resource groups?

In simple terms an Azure resource group is a container for Azure resources, usually These are resources that are similar and share a lot so by grouping them you make the work easy for management, It’s like when you have files on your PC and you decide to group them based on their types for example create a music folder, movies folder, pictures folder so that you manage them together.

This post is on how one can create a resource group with Azure CLI, Note you can create them using the Azure portal, which uses the graphical user interface and is quite easy to do, You can also use Azure PowerShell, this one is mostly used by windows users(I am a windows user but I won’t use it), you can also use Templates and Azure SDKs like .NET and Java. In this post I am going to use Azure CLI, I love using Unix-based CLI that is why. Maybe in the future, I’ll do posts where I create a resource group using other methods.

I won't go through the basic setup of Azure CLI and so on, however, I'll put links below on how to start with Azure CLI and so on.

Now to the juicy part, where we do the creation of the resource group. I’m going to be using the terminal on vs. code, I just like using it cause of the theme I installed there LOL.

![](/images/2023/09/screenshot-2023-09-08-171252.png)

The command we use is the `az group create` the rest are parameters we specify for example name is simply the name we give to the group then location is the azure location we choose to use, it's best to use one as close to you as possible, you can't just type out any location, for example, I can not just type `--location Nigeria`, it needs to be a specific location that azure has datacenters on. Below is a screenshot of what the command should return.

![](/images/2023/09/screenshot-2023-09-08-171320-3.png)

Now that we have created a resource group we can check for resource groups we have using the `az group list`, I will have a couple of other resource groups listed because I have played around with Azure a lot. Here are the results of that command.

![](/images/2023/09/screenshot-2023-09-08-171630-2.png)

As you can see this command returns a long JSON formatted text which can be overwhelming, It is detailed but can be scary for beginners so we can use another command to format the results better and that is `az group list --output table`, This command gives us a clean table like result as you will see below.

![](/images/2023/09/screenshot-2023-09-08-171700-1.png)

And there we have it our resource groups, we can see the one we just created the "test\_group" and it gives us status in this case it says succeeded which is what you want to see.

`az group show --name test_group` We then have the `show --name` command which we use to show a specific group, here we want to see the group we just created, test\_group, and here are the results it's going to give us.

![](/images/2023/09/screenshot-2023-09-08-171942-3.png)

Finally the last command I'm going to touch on is the `az group delete --name solo_grp` which is the command for deleting a resource group.

![](/images/2023/09/screenshot-2023-09-08-172157-1.png)

After running the command it will ask you if you are sure you want to perform the operation and when you click yes it will have 'Running' until it's done deleting and your screen will look like this.

![](/images/2023/09/screenshot-2023-09-08-172209-1.png)

That is all I wanted to cover in my first Azure post, I hope I can keep posting more on this, and on cyber security, I want to focus on these 3, networking, cloud, and security. Thank you for reading, See you on the next post.

Link to setting up Azure CLI

https://learn.microsoft.com/en-us/cli/azure/get-started-with-azure-cli
