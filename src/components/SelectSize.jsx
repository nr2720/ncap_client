
import { useState, useEffect } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

//store import

import state from '../store'
import { useSnapshot } from 'valtio'

const size = [
  {
    id: 0,
    size: 0.0045,
    name: 'X-Small'
  },
  {
    id: 1,
    size: 0.005,
    name: 'Small'
  },
  {
    id: 2,
    size: 0.0065,
    name: 'Medium'
  },
  {
    id: 3,
    size: 0.0085,
    name: 'Large'
  },
  {
    id: 4,
    size: 0.01,
    name: 'X-Large'
  },
  {
    id: 5,
    size: 0.0125,
    name: 'XX-Large'
  }
]

export default function SelectSize() {

  const snap = useSnapshot(state);



  const [selected, setSelected] = useState(size[2]);

  const handleSelected = (e) => {
    setSelected(size[e.target.value]);
  }


  useEffect(() => {
    state.sizeText = selected.size;
  }, [selected])

  return (
    // <Listbox value={selected} onChange={handleSelected}>
    //   <div className="relative mt-2">
    //     <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
    //       <span className="flex items-center">
    //         <span className="ml-3 block truncate">{selected.id}</span>
    //       </span>
    //       <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
    //         <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
    //       </span>
    //     </ListboxButton>

    //     <ListboxOptions
    //       transition
    //       className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
    //     >
    //       {size.map((size) => (
    //         <ListboxOption
    //           name={size.size}
    //           value={size.id}
    //           key={size.id}
    //           className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
    //         >
    //           <div className="flex items-center">
    //             <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
    //               {size.name}
    //             </span>
    //           </div>

    //           <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
    //             <CheckIcon aria-hidden="true" className="h-5 w-5" />
    //           </span>
    //         </ListboxOption>
    //       ))}
    //     </ListboxOptions>
    //   </div>
    // </Listbox>
    <form class="max-w-sm mx-auto">
    <select onChange={handleSelected} id="sizes" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      {size.map((size) => (
                      <option key={size.id} value={size.id}>
                          {size.name}
                      </option>
                  ))}
    </select>
  </form>
  )
}