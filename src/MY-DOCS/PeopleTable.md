```javascript
  <td>
    {!person.motherName && '-'}
    {person.motherName && !mother && person.motherName}
    {mother && <PersonLink person={mother} />}
    {/* motherName отсутствует */}
    {/* motherName есть → person.name не найден в people → просто текст имени */}
    {/* motherName есть → person.name найден в people → ссылка на человека */}
  </td>
```
