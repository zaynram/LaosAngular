Feature Brainstorming / Idea Workspace

# var: Last Update Sent
# 	desc: most recent occurrenct of client recieving update from the firm regarding case status
> [def] : <case.lastUpdateSent: Date | null = new Date()>
>> [permissions] :
	>> [set] : <client>, <paralegal>
	>> [get] : <attorney>, <client>

# fcn: reset()
# 	desc: reset $var to new Date() (set variable to today's date)
> [deps] : <onReset() : void>
>> [triggers] : <onButtonPress>, <onClientNotified>

# fcn: notifyUpdateOverdue(case)
# 	desc: send notification to this.res_paralegal with content "reminder: update $case.parties[0].client"
> [deps] : <sendNotification()>
>> [triggers] : <if ![$var <= 2 weeks]>
