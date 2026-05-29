export default function Searchbar(name: string, placeholder: string) {
     return (
          <search>
               <form>
                    <input name={name} placeholder={placeholder}></input>
               </form>
          </search>
     );
}
