export interface TestDataType {
   id?:number,
   title:string,
   slug:string,
   m2:number,
   image:string,
   posted:string,
   location:{
    region:string;
    distance:string
   },
   category:string 
}
export const testData:TestDataType[] = [ //It just a test(ex) data 
    {
        id:1,
        title:'Demolición completa de edificios y estructuras',
        m2:25,
        slug:'laying-tiles-25m2-floor-in-bathroom-kitchen-hall-Madrid-30-uid-9981',
        image:'/NewJobPostTest/NewJobTestImg.png',
        posted:'5 hours ago',
        location:{
            region:'Madrid',
            distance:'30 kilometer'
        },
        category:'Demolition & disposal'
    },
    {
        id:2,
        title:'Demolición completa de edificios y estructuras',
        m2:220,
        slug:'laying-tiles-220m2-paint-on-floor-in-kitchen-bathroom-hallway-hamburg-100-uid-9982',
        image:'/NewJobPostTest/NewJobTest2img.png',
        posted:'10 hours ago',
        location:{
            region:'Madrid',
            distance:'100 kilometer'
        },
        category:'Demolition & disposal'
    },
    {
        id:3,
        title:'Demolición completa de edificios y estructuras',
        m2:100,
        slug:'Laying-tiles-Floor-kitchen-uid-9984',
        image:'/NewJobPostTest/NewJobTest3img.png',
        posted:'17 hours ago',
        location:{
            region:'Madrid',
            distance:'50 kilometer'
        },
        category:'Demolition & disposal'
    },
]