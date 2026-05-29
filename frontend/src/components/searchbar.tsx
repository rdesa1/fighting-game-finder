interface SearchbarProps {
     name: string
     placeholder: string
}

export default function Searchbar<SearchbarProps>({name, placeholder }) {
     return (
          <search>
               <form>
                    <input name={name} placeholder={placeholder}></input>
               </form>
          </search>
     );
}
