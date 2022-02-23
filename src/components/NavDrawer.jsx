import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TopicIcon from "@mui/icons-material/Topic";
import ArticleIcon from "@mui/icons-material/Article";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import useStoreLocal from "../storeLocal";

export default function NavDrawer() {
    const toggleDrawer = useStoreLocal(state => state.toggleDrawer);
    const drawerVisible = useStoreLocal(state => state.drawerVisible);

    return (
        <Drawer
            anchor="left"
            open={drawerVisible}
            onClose={toggleDrawer}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >
                <List>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <ListItem button key="Topics">
                            <ListItemIcon>
                                <TopicIcon />
                            </ListItemIcon>
                            <ListItemText primary="Topics" />
                        </ListItem>
                    </Link>
                    <Link to="/tree" style={{ textDecoration: "none" }}>
                        <ListItem button key="Trees">
                            <ListItemIcon>
                                <AccountTreeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trees" />
                        </ListItem>
                    </Link>
                    <Link to="/content" style={{ textDecoration: "none" }}>
                        <ListItem button key="Content">
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Content" />
                        </ListItem>
                    </Link>
                </List>
            </Box>
        </Drawer>
    );
}