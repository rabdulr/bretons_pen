import React, { useState, useEffect } from 'react';

const App = () => {
    const [script, setScript] = useState('');
    const [snippet, setSnippet] = useState('');
    const [story, setStory] = useState('');
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState({});

    
    const random = [
        {
            'count': 6
        },
        {          
            'Jeff': {
                '0': 'This is ',
                '2': 'of a girl ',
                '4': 'and drowned the whole world. '
            }},
            {        
            'Harry': {
                '1': 'the story ',
                '3': 'who cried a river '
            }},
            {
            'Jess': {
                '5': 'And when she smiles'
                }}
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

    const arrangeStory = (random) => {
        const completeStory = [];
        random.forEach(element => {
            // Get username
            const user = Object.keys(element);
            if(user[0] === 'count') return;
            // Get array of keys
            const stories = Object.keys(element[user]);
            // loop through the keys and create the story
            stories.forEach(place => {
                const snippet = element[user][place];
                completeStory[place*1] = element[user][place];
            })
        });
        // return completeStory.join().replace(/,/g, '');
        return completeStory[completeStory.length - 1]
    };

    const addStory = () => {
        // Currently replacing all values as opposed to updating it
        const currentScript = [...script];
        const num = currentScript[0]['count'].toString();

        if(!users.includes(user)) {
            const newUser = {};
            newUser[user] = {[num]: story};
            currentScript.push(newUser)
        } else {
            const currentUser = currentScript[users.indexOf(user)]
            console.log(currentScript[users.indexOf(user)])
            // currentScript[users.indexOf(user)][num] = story
        }

        currentScript[0]['count']++;
        setScript(currentScript)
    }

    return(
        <div>
            <h1>Breton's Pen</h1>
            <h3>An exquisite corpse monologue and scene repository</h3>
            <div>
                <h2>Current Story</h2>
                <p>{snippet}</p>
            </div>
            <div>
                <label>User: <input type='type' placeholder='name' onChange={ev => setUser(ev.target.value) } value={ user }></input></label>
                <br/>
                <label>Story: <textarea placeholder='story' onChange={ev => setStory(ev.target.value)} value={ story }></textarea></label>
                <br/>
                <button onClick={addStory}>Add Story</button>
            </div>
        </div>
    )
};

export default App;