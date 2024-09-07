
import {Standing,Team} from "@/types"

import getStandings from "./getStandings"

export default async function getTeams():Promise<Team[]>{
    try{
        const standings: Standing[]=getStandings();
        const teams:Team[]=[];

        for (const standing of standings){
            if(Array.isArray(standing)){
                for(const team of standing){
                    teams.push(team)
                }

            }else{
                throw new Error("Invalid Standings data")
            }

        }
        return teams;
    }
    catch(error){
        console.error("Error Occured while fetching teams",error)
        throw error;
    }
}