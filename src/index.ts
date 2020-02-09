const callAPIforData = () => {
  fetch('http://localhost:3000/dogs?type=hound', {
    method: 'GET',
    headers: new Headers(
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    ),
  })
  .then(data => data.json())
  .then(data => {
    console.log(data);
  });
};

callAPIforData();