import React, { useState, useEffect } from 'react';

const App = () => {
    const [script, setScript] = useState([]);
    const [snippet, setSnippet] = useState('');
    const [lineCount, setLineCount] = useState('')
    const [story, setStory] = useState('');
    const [completeStory, setCompleteStory] = useState('');
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState({});

    
    const random = [
        {
            'count': 6
        },
        {          
            'Jeff': {
                '0': 'This is',
                '2': 'of a girl',
                '4': 'and drowned the whole world.'
            }
        },
        {        
            'Harry': {
                '1': 'the story',
                '3': 'who cried a river'
            }
        },
        {
            'Jess': {
                '5': 'And when she smiles'
            }
        }
    ];
    
    useEffect(() => {
        if(random) {
            setScript(random);
            setSnippet(arrangeStory(random));
            const tempUsers = []
            random.forEach(item => tempUsers.push((Object.keys(item))[0]));
            setUsers(tempUsers);
        }
    }, [])

    useEffect(() => {
        setSnippet(arrangeStory(script));
        const tempUsers = [];
        script.forEach(item => tempUsers.push((Object.keys(item))[0]));
        setUsers(tempUsers);
    }, [script])

    const arrangeStory = (random) => {
        const completeStory = [];
        random.forEach(element => {
            // Get username
            const user = Object.keys(element);
            if(user[0] === 'count') setLineCount(element['count']);
            // Get array of keys
            const stories = Object.keys(element[user]);
            // loop through the keys and create the story
            stories.forEach(place => {
                const snippet = element[user][place];
                completeStory[place*1] = element[user][place];
            })
        });
        setCompleteStory(completeStory.join().replace(/,/g, ' '));
        return completeStory[completeStory.length - 1]
    };

    const addStory = () => {
        // Currently replacing all values as opposed to updating it
        const currentNum = script[0]['count'];

        if(!users.includes(user)) {
            const newUser = {};
            newUser[user] = {[currentNum]: story};
            setScript([...script, newUser])
        } else {
            const currentUserIdx = users.indexOf(user)
            const currentUser = script[currentUserIdx]
            currentUser[user][currentNum] = story;
            const newMap = script.map(item => {
                if(item[user] === currentUser[user]) currentUser;
                return item;
            });
            setScript(newMap)
        }
        
        script[0]['count']++;
        setUser('');
        setStory('');

    }

    
    return(
        <div>
            <h1>Breton's Pen</h1>
            <h3>An exquisite corpse monologue and scene repository</h3>
            <div>
                <h2>Story Snippet</h2>
                <p>{snippet}</p>
            </div>
            <div>
                <label>User: <input type='type' placeholder='name' onChange={ev => setUser(ev.target.value) } value={ user }></input></label>
                <br/>
                <label>Story: <textarea placeholder='story' onChange={ev => setStory(ev.target.value)} value={ story }></textarea></label>
                <br/>
                <button onClick={addStory}>Add Story</button>
            </div>
            <hr/>
            <div>
                <p>Current lines: {lineCount}</p>
                <h3>Current Story</h3>
                <p>{ completeStory }</p>
            </div>
        </div>
    )
};

export default App;