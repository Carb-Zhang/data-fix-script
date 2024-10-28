// SELECT

//  distinct tr.business ,tr.transactionid ,tr.receiptnumber ,tr.registerid,tr.storeid ,tr.createdtime ,tr.modifiedtime ,tr.preorderid
// from
//         storehub_mongo.transactionrecords tr
// left join storehub_mongo.businesses b on
//         tr.business = b."name"
// left join storehub_mongo.businesses__stores bs on
//         tr.storeid = bs."_id"
// where
//         tr.createdtime  < '2024-09-18 04:00' and

//         tr.modifiedtime  > '2024-09-19' and
//          b.country = 'PH'
//         and tr.modifiedtime <> tr.createdtime
//         AND TR."transactiontype" NOT IN ('Return',
//         'PreOrder')
//         AND TR."iscancelled" is not true
//         and channel = 2
//         and bs.isBIRAccredited is true
//         order by tr.createdtime desc;

export const ordersBefore0917 = [
    {
        business: 'drwinebgccorp',
        transactionid: 'b3ca4a06-e8e7-4f2c-8b98-278ea65c0cfb',
        receiptNumber: '00000156968',
        registerid: '62a2fc88246bfe0009b14d9e',
        storeid: '62a2fc88246bfe0009b14d9d',
        createdtime: '2024-09-10 15:33:33',
        modifiedtime: '2024-09-25 19:22:45',
        preorderid: '',
    },
    {
        business: 'wokalley',
        transactionid: '2abc6dfa-b942-44b1-a523-da5c980a8835',
        receiptNumber: '00000061466',
        registerid: '5e6c724e68f1c10b2e250fd1',
        storeid: '5e6c724e68f1c10b2e250fd0',
        createdtime: '2024-09-08 08:41:15',
        modifiedtime: '2024-09-30 08:58:04',
        preorderid: '',
    },
    {
        business: 'izakaya',
        transactionid: '89d5c2ec-bc77-44c1-ba95-3c5ddfb4d193',
        receiptNumber: '00300007263',
        registerid: '654833de74d1fc0007de4be3',
        storeid: '642a5da269f32b00061c042c',
        createdtime: '2024-09-16 09:50:22',
        modifiedtime: '2024-09-30 06:21:21',
        preorderid: '',
    },
    {
        business: 'izakaya',
        transactionid: 'f4e0e130-bcef-4707-b810-a3016422d625',
        receiptNumber: '00300007265',
        registerid: '654833de74d1fc0007de4be3',
        storeid: '642a5da269f32b00061c042c',
        createdtime: '2024-09-14 14:36:21',
        modifiedtime: '2024-09-30 06:44:15',
        preorderid: '',
    },
    {
        business: 'lydiaslechonquezoncityinc',
        transactionid: 'acd3548e-3aff-4b09-bc19-a24ae3f9fc25',
        receiptNumber: '00100005906',
        registerid: '64ed4ea120dd1900066ac318',
        storeid: '654c6395d390470007e97cf8',
        createdtime: '2024-09-06 12:02:24',
        modifiedtime: '2024-09-29 12:50:14',
        preorderid: '2240906478',
    },
    {
        business: 'wokalley',
        transactionid: '73971e10-5b81-4016-a3ff-8692a9f92b8e',
        receiptNumber: '00000061450',
        registerid: '5e6c724e68f1c10b2e250fd1',
        storeid: '5e6c724e68f1c10b2e250fd0',
        createdtime: '2024-08-13 10:26:21',
        modifiedtime: '2024-09-30 07:55:32',
        preorderid: '',
    },
    {
        business: 'izakaya',
        transactionid: '1600dcc9-2f08-48d9-9755-347c09cafaa9',
        receiptNumber: '00300007264',
        registerid: '654833de74d1fc0007de4be3',
        storeid: '642a5da269f32b00061c042c',
        createdtime: '2024-09-10 06:26:20',
        modifiedtime: '2024-09-30 06:39:37',
        preorderid: '',
    },
    {
        business: 'drwinebgccorp',
        transactionid: '1a809f36-c3b8-49f3-ba3e-d76266ef3a10',
        receiptNumber: '00000158224',
        registerid: '62a2fc88246bfe0009b14d9e',
        storeid: '62a2fc88246bfe0009b14d9d',
        createdtime: '2024-09-01 05:28:01',
        modifiedtime: '2024-09-30 11:32:46',
        preorderid: '',
    },
    {
        business: 'izakaya',
        transactionid: '1724e974-459a-40ca-8ee8-8ed14a025b66',
        receiptNumber: '00300007266',
        registerid: '654833de74d1fc0007de4be3',
        storeid: '642a5da269f32b00061c042c',
        createdtime: '2024-09-03 04:49:43',
        modifiedtime: '2024-09-30 06:48:39',
        preorderid: '',
    },
    {
        business: 'drwinebgccorp',
        transactionid: '34a49a92-b099-4d26-af42-923016090791',
        receiptNumber: '00000156969',
        registerid: '62a2fc88246bfe0009b14d9e',
        storeid: '62a2fc88246bfe0009b14d9d',
        createdtime: '2024-09-10 17:34:07',
        modifiedtime: '2024-09-25 19:22:52',
        preorderid: '',
    },
    {
        business: 'izakaya',
        transactionid: '3da7f500-4d42-4e98-81ce-5c1ab59ab498',
        receiptNumber: '00300007268',
        registerid: '654833de74d1fc0007de4be3',
        storeid: '642a5da269f32b00061c042c',
        createdtime: '2024-09-07 13:18:32',
        modifiedtime: '2024-09-30 06:52:17',
        preorderid: '',
    },
    {
        business: 'drwinebgccorp',
        transactionid: '3283d06a-4302-4b81-ba8a-d69a8fc3da04',
        receiptNumber: '00000156967',
        registerid: '62a2fc88246bfe0009b14d9e',
        storeid: '62a2fc88246bfe0009b14d9d',
        createdtime: '2024-09-04 09:23:46',
        modifiedtime: '2024-09-25 19:22:33',
        preorderid: '',
    },
    {
        business: 'davaofamous',
        transactionid: '5b092850-0fd8-4a38-b697-880d3ca250e4',
        receiptNumber: '00800007628',
        registerid: '63cf530f76a1da0009d446eb',
        storeid: '667e4f37532f42000640dfcc',
        createdtime: '2024-09-15 02:42:37',
        modifiedtime: '2024-09-25 08:44:55',
        preorderid: '',
    },
    {
        business: 'orientaldeli',
        transactionid: '775e7191-460e-4624-a7fe-312e4271bda6',
        receiptNumber: '00600012513',
        registerid: '658591fe02dbd0000768f0b2',
        storeid: '65858f56059feb0007163527',
        createdtime: '2024-09-16 04:22:57',
        modifiedtime: '2024-09-25 02:28:50',
        preorderid: '',
    },
    {
        business: 'davaofamous',
        transactionid: '8f7c3649-07f7-4ec4-9859-b82e2cfd47de',
        receiptNumber: '00800007631',
        registerid: '63cf530f76a1da0009d446eb',
        storeid: '667e4f37532f42000640dfcc',
        createdtime: '2024-09-17 08:31:12',
        modifiedtime: '2024-09-25 08:50:19',
        preorderid: '',
    },
    {
        business: 'davaofamous',
        transactionid: 'ad926d24-a687-4c3c-9ebd-14e66af15ebd',
        receiptNumber: '00800007635',
        registerid: '63cf530f76a1da0009d446eb',
        storeid: '667e4f37532f42000640dfcc',
        createdtime: '2024-09-11 04:06:49',
        modifiedtime: '2024-09-25 09:00:14',
        preorderid: '',
    },
];
