import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Comment } from '@mui/icons-material'
import { Button, Card, CardActionArea, CardActions, CardContent } from '@mui/material';
import { getStuff } from './Prisma'; 

// import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxList() {
  const [checked, setChecked] = useState([0]);
  const [data, setData] = useState([])

  useEffect(() => {
    async function callGetStuff() {
      await getStuff()
    }
    callGetStuff()
  })


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card sx={{ inlineSize: 'fit-content' }}>
      <CardContent>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {data.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <Comment />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActions>
        <Button onClick={() => setData([...data, data.length])}>Add Item</Button>
        <Button onClick={() => setData(data.splice(data, data.length-1))}>Subtract Item</Button>
      </CardActions>
    </Card>
  );
}

export {
  CheckboxList
}
