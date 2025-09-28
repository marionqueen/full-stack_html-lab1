import React, { useState } from 'react';
import { organizationData } from '../data/organization_data';

const Organization: React.FC = () => {
  return (
    <div>
      <h2>Organization Structure</h2>
      
      <section>
        {Object.entries(organizationData.leadership).map(([department, leaders]) => (
          <div key={department} className="departments-employees">
            <h4>{department}</h4>
            <ul>
              {leaders.map((leader, index) => (
                <LeaderCard 
                  key={index} 
                  leader={leader} 
                />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

// Separate component following instructor's RecipeItemCard pattern
const LeaderCard: React.FC<{ leader: { name: string; role: string; description: string } }> = ({ leader }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <li style={{ marginBottom: '1rem', listStyle: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span><strong>{leader.name}</strong> - {leader.role}</span>
        <button 
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: '1px solid #007bff',
            borderRadius: '3px',
            padding: '0.2rem 0.5rem',
            cursor: 'pointer',
            color: '#007bff',
            fontSize: '0.8rem'
          }}
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>
      {expanded ? (
        <div style={{
          marginTop: '0.5rem',
          padding: '0.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '0.9rem',
          color: '#555'
        }}>
          {leader.description}
        </div>
      ) : (
        <></>
      )}
    </li>
  );
};

export default Organization;