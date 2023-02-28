module.exports = {
    "v_typ": [{
        Number: "must be numeric!",
        Val012: "must be a value of 0 or 1 or 2!",
        Val01: "must be a value of 0 or 1!",
        Val12: "must be a value of 1 or 2!",
        Val123: "must be a value of 1 or 2 or 3!",
        Null: "must be null!",
        Empty: "must be defined!",
        Zero: "must be a value of 0!",
        One: "must be a value of 1!",
        Objt: "must be an object!",
        Atl1: "must be an object with atleast one property set!",
        Atl2: "must be an object with atleast two property set!",
        Atl3: "must be an object with atleast three property set!",
        NRpt: "must be an object without duplicate property value!",
        CurDate: "must be same as current date!",
        GtrDate: "must be greater than current date!",
        VEmail: "must be valid!",
        VPhNr: "must be ten digits!",
        VDyMn: "must be day and month format (dd-mm)!",
        VDate: "format must be (dd-mmm-yyyy)!",
        ddmmyyyy: "format must be (dd-mm-yyyy)!",
        VEDate: "format must be (yyyy-mm-dd)!",
        VTime: "format must be (hh:mm am/pm)!",
        VGRP: "must be valid name format (name@domainname)!",
        ValIP: "must be valid IP address!",
        Img: "must be valid url of an image format (http://domain.com/image.jpg)",
        VClr: "must be valid hex color format ((aaa / 000) or (aaaaaa / 000000))",
        NumCm: "must be numeric with comma separator format without spaces (1,2,3,4)",
        GPCH: "must be a value of 'group' or 'channel'",
        YNA: "must be a value of 'yes' or 'no' or 'all'",
        TF: "must be a value of 'true' or 'false'",
        Generic: "is not valid!",
        Routing: "must be 'automatic' or 'manual'",
    }],
    "v_txt": [{
        VisaID: "Visa ID",
        roleName: "Role name",
        DefaultRole: "DefaultRole",
        userId: "User ID",
        username: "UserName",
        roleId: "Role ID",
        firstName: "First Name",
        lastName: "Last Name",
        address: "Address",
        mobileNo: "Mobile No",
        primaryContactNo: "Primary ContactNo",
        partyType: "Party Type",
        emailId: "Email ID",
        functionID:"Function ID",
        languageCode:"Language Code",
        formId:"Form ID",
        visaName:"VISA Name",
        visaDescription:"Visa Description",
        entryValidity :"Entry Validity",
        multipleEntries:"Multiple Entries",
        stayValidity:"Stay Validity",
        extendable:"Extendable",
        documentChecklist:"Document Checklist",
        photoBgColor:"Photo Background Color",
        renderType:"Render Type",
        dataId:"Data ID",
        filterString:"Filter String",
        routeId:"Route ID",
        docTranRef:"docTranRef",
        workflowId:"Workflow ID",
        tableName:"table Name",
        keyValue:"key Value",
        workflowStageId: "Workflow Stage ID",
        actionId: "Action ID",
        action: "Action",
        remarks:"Remarks",
        status:"Status",
        escalationId:"Escalation ID",
        reqId:"Requirement ID",
        companyName:"Company Name",
        transactionId:"Transaction ID",
        quoteNo:"Quotation No",
        status:"Status",
        contractId:"Contract ID",
        rowId:"Row ID",
		employeeTypeId: "Employee Type ID",
        ticketType: "Ticket Type",
        routingType: "Routing Type",
        additionalRouting: "Additional Routing",
        emailLevel1: "Email Level 1",
        emailLevel2: "Email Level 2",
        ticketId:"Ticket Id",
        docType:"Document Type",
        routeStageNum:"Route Stage Number",
        tranRole:"Workflow Role",
        partyId: "Party Id",
        operationType: "Operation Type",
        partyName: "Party Name",
        segment: "segment",
        remarks: "remarks",
        sadetails: "sadetails"
        
    }],
    
    ErrorCode: {
        "IncompatibleVersion": "E_VERN01",
        "SessionExpired": "E_SESN01",
        "UserDeactivated": "E_DACT01",
        "UserDeleted": "E_DACT02",
        "InsufficientPermission": "E_PERM01",
        "UnauthorizedRequest": "E_AUTH01",
        "WrongPassword": "E_AUTH02",
        "NoCreateGroupPermission": "E_GRUP01",
        "DuplicateGroupName": "E_GRUP02",
        "GroupCannotBeDeleted": "E_GRUP03",
        "GroupMemberLimitExceeded": "E_GRUP04",
        "NoCreatePollPermission": "E_POLL01",
        "PollClosed": "E_POLL02",
        "InvalidLoginID": "E_AUTH03",
        "SimultaneousLogin": "E_AUTH04",
        "NodeViewPermission": "E_NODE01",
        "ExistingDomain": "E_DOMN01",
        "ExistingTerm": "E_TERM01",
    },
   
    Default: {
        
    },
}