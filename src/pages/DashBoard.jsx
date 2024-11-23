import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const DashBoard = () => {
  const stats = [
    { label: "Total Events", value: 45 },
    { label: "Upcoming Events", value: 12 },
    { label: "Completed Events", value: 30 },
    { label: "Users Registered", value: 120 },
  ];

  return (
    <Grid container spacing={4} sx={{ padding: 3 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              textAlign: "center",
              bgcolor: "background.paper",
            }}
          >
            <CardContent>
              <Typography variant="h5" color="primary">
                {stat.value}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {stat.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashBoard;
