console.log("here");

const callAPIforData = () => {
  fetch('http://localhost:3000', {
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