import React, { useState } from 'react';
import { organizationData } from '../data/organization_data';

const Organization: React.FC = () => {
  const [expandedRoles, setExpandedRoles] = useState<{ [key: string]: boolean }>({});

  // Function to toggle showing/hiding role descriptions
  const toggleDescription = (roleId: string) => {
    setExpandedRoles(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  return (
    <div>
      <h2>Organization Structure</h2>
      
      <section>
        {Object.entries(organizationData.leadership).map(([department, leaders]) => (
          <div key={department} className="departments-employees">
            <h4>{department}</h4>
            <ul>
              {leaders.map((leader, index) => {
                const roleId = `${department}-${index}`;
                const isExpanded = expandedRoles[roleId];
                
                return (
                  <li key={index} style={{ marginBottom: '1rem' }}>
                    <div>
                      <strong>{leader.name}</strong> - {leader.role}
                      <button
                        onClick={() => toggleDescription(roleId)}
                        style={{
                          marginLeft: '10px',
                          padding: '4px 8px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        {isExpanded ? 'Hide' : 'Show'} Description
                      </button>
                    </div>
                    {isExpanded && (
                      <div style={{
                        marginTop: '8px',
                        padding: '10px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        fontSize: '14px',
                        color: '#555'
                      }}>
                        {leader.description}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Organization;