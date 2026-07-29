---
title: "Creating VM's in Azure"
date: 2023-09-10
tags: ["cloud"]
summary: "On the previous post I wrote about creating Azure resource groups which we are going to use here to \"store\" our VM's. We’ll start by defining what a..."
readTime: "5 min"
---

On the previous post I wrote about creating Azure resource groups which we are going to use here to "store" our VM's.

We’ll start by defining what a virtual machine is, it may sound self-explanatory but I’ll try to define it in my own words, A virtual machine commonly referred to as a VM is a computer that’s not physical, it’s “virtual” it runs on a physical machine, it’s more like an emulator, so let’s say you have your current computer and you decide to create a VM this means you are creating a computer to run on your PC but as a completely separate machine. This makes it easy for things like labs where you want to experiment, and build some labs, with VM’s You have freedom because if something breaks you can simply uninstall and create another VM, but note VMs use your computer resources so let’s say I have a PC with 16 GB of ram, I can’t create a VM and allocate it 24gb of ram because “it’s virtual” no it has to get resource from where it is hosted, so for this example I might give it 8 GB of ram and the remaining 8 can be used by the host PC processes or maybe I want to run multiple VM’s so I give them 2 GB each.

Now I’m going to create VMs with Azure, I’ll use 2 methods, Azure CLI and azure PowerShell It won’t be a long read because the processes are fairly easy. I'll also add a link to creating with the azure portal, the process is boring for me.

**VM with Azure CLI.**

`az vm create --resource-group test_group --name ubuntuVM --image Ubuntu2204 --admin-username solomzi --generate-ssh-keys --output json --verbose`

To explain the command, the az vm create is the command itself then the rest are parameters, firstly we have the `--resource-group` test\_group parameter which is where we tell Azure which resource group this VM, which is a resource going to be on, we then have the `--name ubuntuVM` which is the name you want to give to your VM, it can be any name I chose ubuntuVM cause the vm will run ubuntu then we have the `--image Ubuntu2204` in simple terms I can say here we are telling azure which os our vm should run, `admin-username solomzi` is the username we are going to use on the VM, we then have `--generate-ssh-keys` which is where to create keys we'll use to access the VM remotely with SSh, `--output json` we are telling azure that we want the output to be in JSON format, you'll see how neatly it comes out when I create the VM and finally `--verbose` by choosing verbose mode it means we'll be provided more detailed information and get updates as it progresses.

![](/images/2023/09/screenshot-2023-09-10-092642.png)

When I first ran the command I had used an upper case for my admin username which is not allowed so always keep in mind when creating a username in Azure that upper case or special characters aren't allowed.

![](/images/2023/09/screenshot-2023-09-10-092734.png)

I corrected the username and the command is running, The first line in green just means I configured a default resource group(which I did) This means if I had not specified the resource group parameter it was going to use the "smile\_tech" group, though we have a warning in yellow on the ssh keys for now this will work.

![](/images/2023/09/screenshot-2023-09-10-093024-1.png)

Now to show the VM we created…  
`az vm show --name ubuntuVM --resource-group test_group`

![](/images/2023/09/screenshot-1149.png)
![](/images/2023/09/screenshot-1150.png)

Now to create a VM with Azure PowerShell, we are going to create a windows server VM

`New-azVm -ResourceGroupName test_group -Name winServer -Image MicrosoftWindowsServer:WindowsServer:2022-datacenter-azure-edition:latest -OpenPorts 80, 3389`

![](/images/2023/09/screenshot-2023-09-10-103455.png)

Note there can be a lot of parameters when doing this like public IP, security group, subnets and so on but here I'm trying to be as a basic as I can be.

![](/images/2023/09/screenshot-2023-09-10-103554.png)

We are then asked to supply vales for credentials, I had used a fodder password and it rejected it, as it should!

I ran the command again and this time gave a strong password, Always use strong passwords not only on Azure but everywhere! From the screenshot below we can see it's creating the VM, We could've specified things like size but I just left it as it is, it will use the defaults

![](/images/2023/09/screenshot-2023-09-10-104243.png)

And we have successfully created our windows server VM.

![](/images/2023/09/screenshot-2023-09-10-104529.png)

To check the VM's I have so far I use the `Get-azVM` command

![](/images/2023/09/screenshot-2023-09-10-104955.png)

We can see 3 VMs here, Don't mind the first one I created it a long time ago As you can see it is in a different resource group but the 2 I created right now are there which means everything is good!

That's all on creating VM's now I'm gonna clean up and delete these 2 VM's I created. We will start with the ubuntuVM.

We'll use Azure CLI to delete it with the command `az vm delete --resource-group test_group --name ubuntuVM --force-deletion none`

![](/images/2023/09/screenshot-2023-09-10-122504.png)

When you run the command you'll get the Are you sure you want to perform that operation which you reply with y to go on with the deleting of the VM and n if you don't wanna delete it anymore. If you type y you'll get the "running…" and when it's done you get this

![](/images/2023/09/screenshot-2023-09-10-123040.png)

Let's run the command to check our VMs again to check if this VM was really deleted.

![](/images/2023/09/image-1.png)

It's gone! now we are going to delete the windows server using powershell. We are going to use this command `Remove-AzVm -ResourceGroupName "test_group" -Name " winServer" -ForceDeletion $true`

![](/images/2023/09/screenshot-2023-09-10-123440.png)

And as usual we get the prompt that asks us if we really want to delete and since I do I type Y,I just learnt this but it seems like with PowerShell there's a default which is Y.

![](/images/2023/09/screenshot-2023-09-10-123459.png)

Done, deleted we are now going to check again our list of VMs.

![](/images/2023/09/image-2.png)

It's gone, we are done. Thanks for reading, I appreciate it.

Link to creating a VM with azure portal.

https://learn.microsoft.com/en-us/training/modules/create-windows-virtual-machine-in-azure/2-create-a-windows-virtual-machine
