import { ApolloServer } from "apollo-server-express";
import connectMongo from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";

const main = async () => {
	const app = express();
	const PORT = process.env.PORT || 5000;

	const schema = await buildSchema({ resolvers: [__dirname + "/resolvers/*.ts"], container: Container });

	const server = new ApolloServer({
		schema,
	});

	try {
		await mongoose.connect(process.env.MONGO!, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		mongoose.connection.readyState === 1 && console.log("connected to db");
	} catch (err) {
		console.log(err);
	}

	app.use(cookieParser());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	const timeTillExpire = 1000 * 60 * 60 * 24;
	const Store = connectMongo(session);

	app.use(
		session({
			secret: process.env.SESSION_SECRET || "test",
			saveUninitialized: false,
			resave: false,
			cookie: {
				maxAge: timeTillExpire,
			},
			store: new Store({
				collection: "chat-site-sessions",
				uri: process.env.DB_URL!,
				expires: timeTillExpire,
			}),
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());
	
	server.applyMiddleware({ app });
	app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
};

main();
