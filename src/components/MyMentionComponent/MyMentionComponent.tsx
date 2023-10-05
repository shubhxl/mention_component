import { CSSProperties, ChangeEvent, KeyboardEvent, useState } from 'react'
import names from "../../data/data.json"

export default function MyMentionComponent() {

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [suggestedNames, setSuggestedNames] = useState<string[]>(names);
  const [selectedUser, setSelectedUser] = useState<string>('');

  const mainInput: CSSProperties = {
    width: '30rem',
    height: '30px',
    borderRadius: '5px'
  }

  const ul: CSSProperties = {
    listStyle: 'none',
    margin: '0 20px 10px -33px'
  }

  const li: CSSProperties = {
    cursor: ' pointer'
  }

  const suggestionBox: CSSProperties = {
    border: '1px solid black',
    marginTop: '10px',
    position: 'absolute'
  }

  const noSuggestionBox: CSSProperties = {
    display: 'none'
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '@') {
      setShowSuggestions(true)
    }
  }


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(e.target.value)

    if (!e.target.value) {
      setSuggestedNames(names)
    }

    if (showSuggestions) {
      const str = e.target.value.split('@')
      const namesToDisplay = suggestedNames.filter(names => names.toLowerCase().includes(str[str.length - 1].toLowerCase()))
      setSuggestedNames(namesToDisplay)
    }
  }

  const conditionalStyle = suggestedNames.length ? suggestionBox : noSuggestionBox

  return (
    <div>
      <input style={mainInput} type="text" placeholder='Mention' value={selectedUser} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} />
      {
        showSuggestions && (
          <div style={conditionalStyle} data-testid='suggestion-box'>
            <ul style={ul} data-testid='suggestion-list'>
              {
                suggestedNames.map((name) => (
                  <li style={li} key={name} data-testid='suggested-name' onClick={() => {
                    const previous = selectedUser.split('@')[0]
                    setSelectedUser(previous + '@' + name)
                    setShowSuggestions(false)
                  }}>{name}</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}
