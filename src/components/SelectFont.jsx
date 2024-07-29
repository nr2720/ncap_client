
import { useState, useEffect } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

//store import

import state from '../store'
import { useSnapshot } from 'valtio'

const fonts = [
  {
    id: 0,
    name: '.font-roboto',
    key: 'Roboto',
    url: 'font/roboto.json'
  },
  {
    id: 1,
    name: '.font-open-sans',
    key: 'Open San',
    url: 'font/opensans.json'
  },
  {
    id: 2,
    name: '.font-lato',
    key: 'Font Lato',
    url: 'font/lato.json'
  },
  {
    id: 3,
    name: '.font-montserrat',
    key: 'Montserrat',
    url: 'font/montserrat.json'
  },
  {
    id: 4,
    name: '.font-oswald',
    key: 'Font Oswald',
    url: 'font/oswald.json'
  },
  {
    id: 5,
    name: '.font-raleway',
    key: 'Raleway',
    url: 'font/raleway.json'
  },
  {
    id: 6,
    name: '.font-playwrite',
    key: 'Playwrite',
    url: 'font/playwrite.json'
  },
  {
    id: 7,
    name: '.font-ubuntu',
    key: 'Ubuntu',
    url: 'font/ubuntu.json'
  },
  {
    id: 8,
    name: '.font-pacifico',
    key: 'Pacifico',
    url: 'font/pacifico.json'
  },
  {
    id: 9,
    name: '.font-dancing-script',
    key: 'Dancing Sricpt',
    url: 'font/dancing.json'
  },
]

export default function SelectFont() {

  const snap = useSnapshot(state);



  const [selected, setSelected] = useState(snap.textFont);

  const handleSelected = (e) => {
    setSelected(fonts[e]);
  }


  useEffect(() => {
    state.textFont = selected;
  }, [selected])

  return (
    <Listbox value={selected} onChange={handleSelected}>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selected.key}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {fonts.map((font) => (
            <ListboxOption
              key={font.id}
              name={font.name}
              value={font.id}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {font.key}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}