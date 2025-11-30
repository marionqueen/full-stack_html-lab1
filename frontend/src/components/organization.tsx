import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useLeaders } from '../hooks/useLeaders';
import { useEntryForm } from '../hooks/useEntryForm';
import * as leaderRepo from '../apis/leaderRepo';

function Organization() {
  const { getToken } = useAuth();
  const { leaders, searchTerm, setSearchTerm, fetchLeaders } = useLeaders();
  const form = useEntryForm();
  
  const handleAdd = async () => {
    if (!form.validateLeader()) {
      return;
    }
    
    try {
      const token = await getToken();
      await leaderRepo.addLeader({
        role: form.selected,
        name: form.name,
        description: form.description
      }, token || undefined);
      
      await fetchLeaders();
      form.reset();
    } catch (error) {
      console.error('Error adding leader:', error);
    }
  };
  
  const availableRoles = leaders.map(l => l.role);
  
  return (
    <div>
      <h2>Organization Structure</h2>
      
      {/* Add New Leader Form */}
      <h3>Add New Leader</h3>
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={form.selected} 
          onChange={(e) => form.setSelected(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          <option value="">Select Role</option>
          {availableRoles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {form.errors.get('role') && <p style={{color: 'red', margin: '5px 0'}}>{form.errors.get('role')}</p>}
        
        <input 
          type="text"
          placeholder="Person Name"
          value={form.name}
          onChange={(e) => form.setName(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        />
        {form.errors.get('name') && <p style={{color: 'red', margin: '5px 0'}}>{form.errors.get('name')}</p>}
        
        <textarea 
          placeholder="Role Description"
          value={form.description}
          onChange={(e) => form.setDescription(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '10px',
            width: '300px',
            height: '60px'
          }}
        />
        {form.errors.get('description') && <p style={{color: 'red', margin: '5px 0'}}>{form.errors.get('description')}</p>}
        
        <button 
          onClick={handleAdd}
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Leader
        </button>
      </div>
      
      {/* Search Bar */}
      <p>Search by role or name:</p>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '300px'
          }}
        />
      </div>
      
      {/* Leaders List - grouped by department */}
      <section>
        {/* Executive */}
        {leaders.filter(l => ['CEO/Chair of Board', 'COO/VP Operations', 'CFO/VP Administration'].includes(l.role)).length > 0 && (
          <div className="departments-employees">
            <h4>Executive</h4>
            <ul>
              {leaders
                .filter(l => ['CEO/Chair of Board', 'COO/VP Operations', 'CFO/VP Administration'].includes(l.role))
                .map((leader, index) => (
                  <LeaderCard key={index} leader={leader} />
                ))}
            </ul>
          </div>
        )}
        
        {/* Technology */}
        {leaders.filter(l => ['CIO', 'Director Information Technology', 'Director Information Security and CISO'].includes(l.role)).length > 0 && (
          <div className="departments-employees">
            <h4>Technology</h4>
            <ul>
              {leaders
                .filter(l => ['CIO', 'Director Information Technology', 'Director Information Security and CISO'].includes(l.role))
                .map((leader, index) => (
                  <LeaderCard key={index} leader={leader} />
                ))}
            </ul>
          </div>
        )}
        
        {/* Management */}
        {leaders.filter(l => ['VP Client Services', 'VP Sales & Marketing', 'Director Human Resources'].includes(l.role)).length > 0 && (
          <div className="departments-employees">
            <h4>Management</h4>
            <ul>
              {leaders
                .filter(l => ['VP Client Services', 'VP Sales & Marketing', 'Director Human Resources'].includes(l.role))
                .map((leader, index) => (
                  <LeaderCard key={index} leader={leader} />
                ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

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
      {expanded && (
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
      )}
    </li>
  );
};

export default Organization;