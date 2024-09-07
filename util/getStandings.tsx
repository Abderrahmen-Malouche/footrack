
import { Standing,League } from "@/types";
import moment from "moment";

export default async function getStandings():Promise<Standing[]>{
    const currentTime=moment();
    const currentMonth=currentTime.month();
    let year;
    if (currentMonth<6){
       year=currentTime.year()-1
    }
    else{
        year=currentTime.year()
    }
    const API_KEY:string=process.env.API_KEY as string;

    const options ={
        method: "GET",
	    headers: {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": API_KEY
	},
    next:{
        revalidate:60*60*24
    }
    };
    const standings:Standing[]=[];
    const leagues=[

        {
            name: 'EPL',
            id:39
        },
        {
            name:"La Liga" ,
            id:140
        },
        {
            name: "Bundesliga" ,
            id:78
        }, 
        {
            name: "Serie A",
            id:135
        },
        {
            name: "ligue1",
            id:61
        }
    ]
    for (const league of leagues){
        let url=`"https://v3.football.api-sports.io/standings?league=${league.id}&season=${year}"`
        try{
            const response = await fetch(url, options);
            const data = await response.json();
            const leagueData=data.response[0];
            if (leagueData){
                standings.push(leagueData.league.standings[0])
            }
        }
        catch(err){
            console.error(`Error fetching ${league.name} standings: ${err}`)
        }
        
    }
    return standings
}