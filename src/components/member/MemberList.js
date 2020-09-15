import React, { useState, useEffect } from 'react';
import MemberCard from './MemberCard';
import dataManager from '../../modules/dataManager'

const MemberList = props => {
    
    const [members, setMembers] = useState([]);

    const getMembers = () =>{
        return dataManager.getAll('members')
            .then((members)=> {
                setMembers(members);
            })
            .catch((err) => console.error('There was an issue with getting all members:', err))
        
    }
    useEffect(() =>{
        getMembers();
    }, [])

    return (
        <div className= 'MembersList'>
            <h1>Members</h1>
            {members.map((member)=> (<MemberCard key={member.id} member={member}/>))}
        </div>
    )
}
export default MemberList