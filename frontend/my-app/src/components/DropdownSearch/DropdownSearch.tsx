import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

type searchItem = {
    id: number;
    name: string;
}
const people: searchItem[] = [
  { id: 1, name: 'Rossie Abernathy' },
  { id: 2, name: 'Juana Abshire' },
  { id: 3, name: 'Leonel Abshire' },
  { id: 4, name: 'Llewellyn Abshire' },
  { id: 5, name: 'Ramon Abshire' },
  // ...up to 1000 people
]

export function DropdownSearch() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(people[0])

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox
      value={selected}
      virtual={{ options: filteredPeople }}
      onChange={(value) => setSelected(value)}
      onClose={() => setQuery('')}
    >
      <div>
        <ComboboxInput
          displayValue={(person: searchItem) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton>
          <ChevronDownIcon />
        </ComboboxButton>
      </div>
      <ComboboxOptions>
        {({ option: person }) => (
          <ComboboxOption key={person.id} value={person}>
            {person.name}
          </ComboboxOption>
        )}
      </ComboboxOptions>
    </Combobox>
  )
}