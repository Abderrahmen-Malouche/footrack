"use client"
import React from 'react'
import SearchBarForm from './SearchBarForm'
import getTeams from '@/util/getTeams'
import { Team } from '@/types'
import { useEffect,useState } from 'react'
const SearchBar = () => {
  const [teams,setTeams]=useState<Team[]>([])

  useEffect(()=>{
    const fetchTeamsData = async()=>{
      try{
        const teamsData :Team[] = await getTeams();
        setTeams(teamsData)
      }
      catch(error){
        console.error("error fetching teams",error)
      }
    }
  })
  return (
    <div className='flex justify-center items-center w-full p-3 bg-black/40'>
      <div className='w-1/6 flex justify-center items-center text-neutral-100'>
      <a
      href={"/"}
      className='flex justify-center items-center'
      >
      <img
        src="/logo.png"
        alt="logo"
        className='w-10 object-cover rounded-full'
      />
      <div className='px-2 md:block hidden font-bold text-xl'>FootTrack</div>
      </a>
      </div>
      <div className='w-4/6 flex justify-center items-center'>
        <SearchBarForm teamsData={teams}/>
      </div>
      <div className='w-1/6'></div>
    </div>
  )
}

export default SearchBar